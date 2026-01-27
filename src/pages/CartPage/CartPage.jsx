import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, totalItems, totalPrice } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <p>Agrega productos para poder comprarlos.</p>
        <Link to="/products">
          <button className="continue-shopping-btn">Ver productos</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h2>Carrito de compras</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <span className="item-name">{item.title || item.name}</span>
              <span className="item-quantity">Cantidad: {item.quantity}</span>
              <span className="item-price">Precio: ${item.price}</span>
            </div>
            <button
              className="remove-item-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p>Total de productos: {totalItems}</p>
        <p>Total a pagar: ${totalPrice.toFixed(2)}</p>
        <div className="cart-actions">
          <button className="clear-cart-btn" onClick={clearCart}>
            Vaciar carrito
          </button>
          <Link to="/checkout">
            <button className="checkout-btn">Ir a pagar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
