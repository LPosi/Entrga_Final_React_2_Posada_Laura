import { useState } from "react";
import { useCart } from "../../context/CartContext";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import "./Checkout.css";

const Checkout = () => {
  const { cart, getTotalItems, getTotalPrice, clearCart } = useCart();
  const [orderId, setOrderId] = useState(null);

  if (getTotalItems() === 0 && !orderId) {
    return (
      <div className="checkout-empty">
        <h2>No hay productos en el carrito</h2>
        <p>Agrega productos antes de proceder al checkout.</p>
      </div>
    );
  }

  const handleOrderCreated = (id) => {
    setOrderId(id);
    clearCart();
  };

  if (orderId) {
    return (
      <div className="order-success">
        <div className="success-icon">✅</div>
        <h2>¡Compra realizada con éxito!</h2>
        <p className="order-id">
          Tu número de orden es: <strong>{orderId}</strong>
        </p>
        <p className="order-message">
          Hemos enviado los detalles a tu email. Puedes hacer seguimiento de tu
          pedido con este número.
        </p>
        <a href="/products" className="btn-primary">
          Volver a la tienda
        </a>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Finalizar Compra</h1>
        <p>Complete sus datos para procesar el pedido</p>
      </div>

      <div className="checkout-content">
        <div className="checkout-form-section">
          <CheckoutForm onOrderCreated={handleOrderCreated} />
        </div>

        <div className="checkout-summary">
          <h3>Resumen del Pedido</h3>
          <div className="order-items">
            {cart.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-info">
                  <span className="item-name">{item.title}</span>
                  <span className="item-quantity">x{item.quantity}</span>
                </div>
                <span className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="order-total">
            <span>Total:</span>
            <span className="total-amount">${getTotalPrice().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
