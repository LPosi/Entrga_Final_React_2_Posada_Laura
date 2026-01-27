import { useCart } from "../../context/CartContext";
import CartItem from "../CartItem/CartItem";
import { formatPrice } from "../../utils/ProductUtils";
import "./Cart.css";

const Cart = () => {
  const { cart, clearCart, getTotalItems, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-icon">🛒</div>
        <h3>Tu carrito está vacío</h3>
        <p>Agrega productos para comenzar a comprar</p>
        <a href="/products" className="btn-shop">
          Ver productos
        </a>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <div className="cart-title">
          <h2>Tu Carrito de Compras</h2>
          <span className="items-count">{getTotalItems()} items</span>
        </div>

        <button
          onClick={() => {
            if (window.confirm("¿Estás seguro de vaciar el carrito?")) {
              clearCart();
            }
          }}
          className="clear-cart-btn"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="cart-items-header">
        <div className="header-product">Producto</div>
        <div className="header-price">Precio</div>
        <div className="header-quantity">Cantidad</div>
        <div className="header-subtotal">Subtotal</div>
        <div className="header-actions">Acciones</div>
      </div>

      <div className="cart-items-list">
        {cart.map((item) => (
          <CartItem key={`${item.id}-${item.quantity}`} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal ({getTotalItems()} items)</span>
          <span>{formatPrice(getTotalPrice())}</span>
        </div>

        <div className="summary-row">
          <span>Envío</span>
          <span className="free-shipping">
            {getTotalPrice() >= 100 ? "Gratis" : formatPrice(5.99)}
          </span>
        </div>

        {getTotalPrice() < 100 && (
          <div className="shipping-note">
            ¡Faltan {formatPrice(100 - getTotalPrice())} para envío gratis!
          </div>
        )}

        <div className="summary-row tax-row">
          <span>Impuestos (21%)</span>
          <span>{formatPrice(getTotalPrice() * 0.21)}</span>
        </div>

        <div className="summary-divider"></div>

        <div className="summary-total">
          <span>Total</span>
          <span className="total-amount">
            {formatPrice(
              getTotalPrice() +
                (getTotalPrice() >= 100 ? 0 : 5.99) +
                getTotalPrice() * 0.21
            )}
          </span>
        </div>

        <div className="summary-actions">
          <a href="/checkout" className="checkout-btn">
            Proceder al Pago
          </a>
          <a href="/products" className="continue-shopping">
            ← Seguir comprando
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
