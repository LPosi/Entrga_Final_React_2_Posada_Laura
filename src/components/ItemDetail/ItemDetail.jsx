import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./ItemDetail.css";

const ItemDetail = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="item-detail-container">
      <h2>{product.title || product.name}</h2>
      {product.image && (
        <div className="item-detail-image">
          <img src={product.image} alt={product.title || product.name} />
        </div>
      )}
      <p className="item-detail-description">{product.description}</p>
      <p className="item-detail-price">${product.price}</p>
      {product.originalPrice && (
        <p className="item-detail-original-price">
          Precio original: ${product.originalPrice.toFixed(2)}
        </p>
      )}
      <button
        className="add-to-cart-btn"
        onClick={() => addToCart(product)}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemDetail;
