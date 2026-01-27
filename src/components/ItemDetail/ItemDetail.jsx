import { useState } from "react";
import { Link } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";
import { useCart } from "../../context/CartContext";
import "./ItemDetail.css";

const ItemDetail = ({ product }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const { addToCart } = useCart();

  const handleOnAdd = (quantity) => {
    addToCart(product, quantity);
    setQuantityAdded(quantity);
  };

  if (!product) {
    return (
      <div className="item-detail-error">
        <h2>Producto no encontrado</h2>
        <Link to="/products">Volver a productos</Link>
      </div>
    );
  }

  return (
    <div className="item-detail-container">
      <div className="item-detail-image">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="item-detail-info">
        <h1 className="item-detail-title">{product.title}</h1>

        <div className="item-detail-category">
          <span>Categoría: {product.category}</span>
        </div>

        <p className="item-detail-description">{product.description}</p>

        <div className="item-detail-price">
          <span className="price">${product.price.toFixed(2)}</span>
          {product.stock <= 5 && product.stock > 0 && (
            <span className="low-stock">
              ¡Últimas {product.stock} unidades!
            </span>
          )}
        </div>

        <div className="item-detail-stock">
          <span>Stock disponible: {product.stock}</span>
        </div>

        <div className="item-detail-actions">
          {quantityAdded === 0 ? (
            <ItemCount initial={1} stock={product.stock} onAdd={handleOnAdd} />
          ) : (
            <div className="item-added-actions">
              <p className="success-message">
                ✅ Se agregaron {quantityAdded} unidades al carrito
              </p>
              <div className="action-buttons">
                <Link to="/cart" className="btn-primary">
                  Ir al carrito
                </Link>
                <Link to="/products" className="btn-secondary">
                  Seguir comprando
                </Link>
              </div>
            </div>
          )}
        </div>

        {product.stock === 0 && (
          <div className="out-of-stock">
            <p>⚠️ Producto sin stock</p>
            <Link to="/products">Ver otros productos</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
