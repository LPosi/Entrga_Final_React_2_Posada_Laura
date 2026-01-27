import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import {
  getProductById,
  getRelatedProducts,
} from "../../services/productService";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";
import RelatedProducts from "./components/RelatedProducts";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError(null);

      try {
        const productData = await getProductById(id);

        if (!productData) {
          setError("Producto no encontrado");
          return;
        }

        setProduct(productData);

        if (productData.variants && productData.variants.length > 0) {
          setSelectedVariant(productData.variants[0]);
        }

        const related = await getRelatedProducts(productData.category, id);
        setRelatedProducts(related);
      } catch (err) {
        console.error("Error cargando producto:", err);
        setError("Error al cargar el producto. Por favor, intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleVariantChange = (variantId) => {
    const variant = product.variants.find((v) => v.id === variantId);
    setSelectedVariant(variant);
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;

    const maxStock = selectedVariant?.stock || product?.stock || 10;
    if (newQuantity > maxStock) {
      alert(`Solo tenemos ${maxStock} unidades disponibles`);
      return;
    }

    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (!product) return;

    const itemToAdd = {
      id: selectedVariant ? `${product.id}-${selectedVariant.id}` : product.id,
      productId: product.id,
      name: product.name,
      price: selectedVariant?.price || product.price,
      image: product.images[0] || product.image,
      quantity: quantity,
      variant: selectedVariant,
      stock: selectedVariant?.stock || product.stock,
      sku: selectedVariant?.sku || product.sku,
    };

    addToCart(itemToAdd);

    const addButton = document.querySelector(".add-to-cart-btn");
    if (addButton) {
      addButton.textContent = "✓ Agregado";
      addButton.classList.add("added");

      setTimeout(() => {
        addButton.textContent = "🛒 Agregar al Carrito";
        addButton.classList.remove("added");
      }, 1500);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      navigate("/cart");
    }, 100);
  };

  if (loading) {
    return <LoadingSpinner message="Cargando producto..." />;
  }

  if (error) {
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Producto no disponible</h2>
        <button onClick={() => navigate("/")} className="back-btn">
          Volver a la tienda
        </button>
      </div>
    );
  }

  const currentPrice = selectedVariant?.price || product.price;
  const discountPercentage = product.discount || 0;
  const finalPrice =
    discountPercentage > 0
      ? currentPrice * (1 - discountPercentage / 100)
      : currentPrice;

  const availableStock = selectedVariant?.stock || product.stock;
  const isOutOfStock = availableStock === 0;
  const lowStock = availableStock > 0 && availableStock <= 5;

  return (
    <div className="product-detail-container">
      <nav className="breadcrumb">
        <a href="/">Inicio</a> &gt;
        <a href={`/category/${product.category}`}>{product.category}</a> &gt;
        <span>{product.name}</span>
      </nav>

      <div className="product-detail-content">
        <div className="product-gallery-section">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        <div className="product-info-section">
          <ProductInfo
            product={product}
            selectedVariant={selectedVariant}
            finalPrice={finalPrice}
            discountPercentage={discountPercentage}
            currentPrice={currentPrice}
            isOutOfStock={isOutOfStock}
            lowStock={lowStock}
            availableStock={availableStock}
            onVariantChange={handleVariantChange}
          />

          <div className="quantity-selector">
            <label>Cantidad:</label>
            <div className="quantity-controls">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                aria-label="Reducir cantidad"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max={availableStock}
                value={quantity}
                onChange={(e) =>
                  handleQuantityChange(parseInt(e.target.value) || 1)
                }
                aria-label="Cantidad de producto"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= availableStock}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
            {lowStock && (
              <div className="stock-warning">
                ⚠️ Solo {availableStock} unidades disponibles
              </div>
            )}
          </div>

          <div className="action-buttons">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`add-to-cart-btn ${isOutOfStock ? "disabled" : ""}`}
            >
              {isOutOfStock ? "AGOTADO" : "🛒 Agregar al Carrito"}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className={`buy-now-btn ${isOutOfStock ? "disabled" : ""}`}
            >
              {isOutOfStock ? "NO DISPONIBLE" : "Comprar Ahora"}
            </button>

            <button className="wishlist-btn" aria-label="Agregar a favoritos">
              ♡
            </button>
          </div>

          <div className="product-features">
            <div className="feature">
              <span className="feature-icon">🚚</span>
              <div>
                <strong>Envío gratis</strong>
                <p>En compras mayores a $50.000</p>
              </div>
            </div>
            <div className="feature">
              <span className="feature-icon">🔄</span>
              <div>
                <strong>30 días de devolución</strong>
                <p>Política de devolución flexible</p>
              </div>
            </div>
            <div className="feature">
              <span className="feature-icon">🔒</span>
              <div>
                <strong>Compra segura</strong>
                <p>Datos protegidos con SSL</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductTabs
        description={product.description}
        specifications={product.specifications}
        reviews={product.reviews}
      />

      {relatedProducts.length > 0 && (
        <RelatedProducts
          products={relatedProducts}
          category={product.category}
        />
      )}
    </div>
  );
};

export default ProductDetail;
