import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/ProductUtils";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(item?.quantity || 1);
  const [isRemoving, setIsRemoving] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Sincronizar cantidad con cambios externos
  useEffect(() => {
    if (item?.quantity && item.quantity !== quantity) {
      setQuantity(item.quantity);
    }
  }, [item?.quantity]);

  // Validar item
  if (!item || !item.id) {
    return (
      <div className="cart-item error">
        <div className="error-message">Producto no disponible</div>
      </div>
    );
  }

  const safeItem = {
    id: item.id || "unknown",
    title: item.title || "Producto sin nombre",
    description: item.description || "Sin descripción",
    price: item.price || 0,
    originalPrice: item.originalPrice || null,
    image: item.image || "",
    category: item.category || "Sin categoría",
    stock: item.stock || 0,
    quantity: item.quantity || 1,
  };

  const subtotal = safeItem.price * quantity;

  const handleIncrement = () => {
    if (quantity >= 100) return;

    const newQuantity = quantity + 1;
    // Verificar stock disponible
    if (safeItem.stock > 0 && newQuantity > safeItem.stock) {
      alert(`Solo hay ${safeItem.stock} unidades disponibles`);
      return;
    }

    setQuantity(newQuantity);
    updateQuantity(safeItem.id, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity <= 1) return;

    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    updateQuantity(safeItem.id, newQuantity);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    // Permitir campo vacío temporalmente
    if (value === "") {
      setQuantity("");
      return;
    }

    const newQuantity = parseInt(value, 10);

    if (!isNaN(newQuantity)) {
      // Validar rango
      if (newQuantity < 1) {
        setQuantity(1);
        updateQuantity(safeItem.id, 1);
      } else if (newQuantity > 100) {
        setQuantity(100);
        updateQuantity(safeItem.id, 100);
      } else {
        // Verificar stock
        if (safeItem.stock > 0 && newQuantity > safeItem.stock) {
          alert(`Solo hay ${safeItem.stock} unidades disponibles`);
          setQuantity(safeItem.stock);
          updateQuantity(safeItem.id, safeItem.stock);
          return;
        }

        setQuantity(newQuantity);
        updateQuantity(safeItem.id, newQuantity);
      }
    }
  };

  const handleQuantityBlur = () => {
    // Si el campo está vacío, establecer a 1
    if (quantity === "" || quantity < 1) {
      setQuantity(1);
      updateQuantity(safeItem.id, 1);
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(safeItem.id);
    }, 300);
  };

  const getStockClass = () => {
    if (safeItem.stock <= 0) return "stock-out";
    if (safeItem.stock <= 5) return "stock-low";
    return "stock-ok";
  };

  const getStockText = () => {
    if (safeItem.stock <= 0) return "Sin stock";
    if (safeItem.stock <= 5) return `Últimas ${safeItem.stock} unidades`;
    return `${safeItem.stock} disponibles`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageUrl = () => {
    if (imageError || !safeItem.image) {
      return "https://via.placeholder.com/100?text=Sin+Imagen";
    }
    return safeItem.image;
  };

  return (
    <div className={`cart-item ${isRemoving ? "removing" : ""}`}>
      {/* Columna: Imagen */}
      <div className="cart-item-image">
        <img
          src={getImageUrl()}
          alt={safeItem.title}
          loading="lazy"
          onError={handleImageError}
          className="product-image"
        />
      </div>

      {/* Columna: Información del producto */}
      <div className="cart-item-info">
        <div className="cart-item-header">
          <h3 className="cart-item-title">
            <a href={`/item/${safeItem.id}`} className="product-link">
              {safeItem.title}
            </a>
          </h3>
          <span className={`cart-item-stock ${getStockClass()}`}>
            {getStockText()}
          </span>
        </div>

        <p className="cart-item-description">
          {safeItem.description.length > 100
            ? `${safeItem.description.substring(0, 100)}...`
            : safeItem.description}
        </p>

        <div className="cart-item-category">
          <span className="category-tag">{safeItem.category}</span>
          {safeItem.originalPrice &&
            safeItem.originalPrice > safeItem.price && (
              <span className="discount-badge">¡Oferta!</span>
            )}
        </div>
      </div>

      {/* Columna: Precio unitario */}
      <div className="cart-item-price">
        <div className="price-label">Precio unitario</div>
        <div className="price-amount">{formatPrice(safeItem.price)}</div>
        {safeItem.originalPrice && safeItem.originalPrice > safeItem.price && (
          <>
            <div className="price-original">
              {formatPrice(safeItem.originalPrice)}
            </div>
            <div className="price-discount">
              {Math.round((1 - safeItem.price / safeItem.originalPrice) * 100)}%
              OFF
            </div>
          </>
        )}
      </div>

      {/* Columna: Cantidad */}
      <div className="cart-item-quantity">
        <div className="quantity-label">Cantidad</div>
        <div className="quantity-controls">
          <button
            type="button"
            className="quantity-btn decrement"
            onClick={handleDecrement}
            disabled={quantity <= 1}
            aria-label="Reducir cantidad"
            title="Reducir cantidad"
          >
            −
          </button>

          <input
            type="number"
            min="1"
            max="100"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleQuantityBlur}
            className="quantity-input"
            aria-label="Cantidad"
            disabled={safeItem.stock <= 0}
          />

          <button
            type="button"
            className="quantity-btn increment"
            onClick={handleIncrement}
            disabled={
              quantity >= 100 ||
              (safeItem.stock > 0 && quantity >= safeItem.stock)
            }
            aria-label="Aumentar cantidad"
            title="Aumentar cantidad"
          >
            +
          </button>
        </div>

        <div className="quantity-actions">
          <button
            type="button"
            className="quantity-remove"
            onClick={handleRemove}
            aria-label="Eliminar producto"
            title="Eliminar del carrito"
          >
            <span className="remove-icon">🗑️</span>
            <span className="remove-text">Eliminar</span>
          </button>

          <button
            type="button"
            className="quantity-save"
            onClick={() => {
              /* Función para guardar para después */
            }}
            aria-label="Guardar para después"
            title="Guardar para más tarde"
          >
            💾 Guardar
          </button>
        </div>
      </div>

      {/* Columna: Subtotal */}
      <div className="cart-item-subtotal">
        <div className="subtotal-label">Subtotal</div>
        <div className="subtotal-amount">{formatPrice(subtotal)}</div>
        <div className="subtotal-details">
          {quantity} × {formatPrice(safeItem.price)}
        </div>
        {safeItem.originalPrice && (
          <div className="subtotal-savings">
            Ahorras:{" "}
            {formatPrice((safeItem.originalPrice - safeItem.price) * quantity)}
          </div>
        )}
      </div>

      {/* Acciones para móvil */}
      <div className="cart-item-actions-mobile">
        <div className="mobile-quantity">
          <button
            className="mobile-qty-btn minus"
            onClick={handleDecrement}
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="mobile-qty-display">{quantity}</span>
          <button
            className="mobile-qty-btn plus"
            onClick={handleIncrement}
            disabled={
              quantity >= 100 ||
              (safeItem.stock > 0 && quantity >= safeItem.stock)
            }
          >
            +
          </button>
        </div>

        <button
          className="remove-btn-mobile"
          onClick={handleRemove}
          aria-label="Eliminar producto"
        >
          <span className="mobile-remove-icon">🗑️</span>
          <span className="mobile-remove-text">Eliminar</span>
        </button>
      </div>
    </div>
  );
};

// Propiedades por defecto
CartItem.defaultProps = {
  item: {
    id: "",
    title: "Producto",
    description: "",
    price: 0,
    image: "",
    category: "General",
    stock: 0,
    quantity: 1,
  },
};

export default CartItem;
