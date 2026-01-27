import { useState } from "react";
import "./ItemCount.css";

const ItemCount = ({ initial = 1, stock = 0, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const increment = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (stock > 0 && quantity > 0) {
      onAdd(quantity);
    }
  };

  return (
    <div className="item-count-container">
      <div className="quantity-selector">
        <button
          className="quantity-btn"
          onClick={decrement}
          disabled={quantity <= 1}
        >
          −
        </button>

        <span className="quantity-display">{quantity}</span>

        <button
          className="quantity-btn"
          onClick={increment}
          disabled={quantity >= stock}
        >
          +
        </button>
      </div>

      <div className="stock-info">
        {stock > 0 ? (
          <span className="available">Disponible: {stock} unidades</span>
        ) : (
          <span className="unavailable">Sin stock</span>
        )}
      </div>

      <button
        className="add-to-cart-btn"
        onClick={handleAddToCart}
        disabled={stock === 0 || quantity === 0}
      >
        {stock === 0 ? "SIN STOCK" : `Agregar al carrito (${quantity})`}
      </button>
    </div>
  );
};

export default ItemCount;
