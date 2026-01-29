import { useCart } from "../../context/CartContext";
import CartItem from "../CartItem/CartItem";
import { formatPrice } from "../../utils/ProductUtils";
import "./Cart.css";

const Cart = () => {
  const { cart, clearCart, getTotalItems, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const TAX_RATE = 0.21;
  const SHIPPING_COST = 5.99;

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-icon" aria-label="Carrito vacío">🛒</div>
        <h3>Tu carrito está vacío</h3>
        <p>Agrega productos para comenzar a comprar</p>
        <a href="/products" className="btn-shop">
          Ver productos
        </a>
      </div>
    );
  }

  const taxes = totalPrice * TAX_RATE;
  const shipping = totalPrice >= 100 ? 0 : SHIPPING_COST;
  const total = totalPrice + taxes + shipping;

  return (
    <div className="cart-container">
      <div className="cart-header">
        <div className="cart-title">
          <h2>Tu Carrito de Compras</h2>
          <span className="items-count">{totalItems} items</span>
        </div>
        <button
          onClick={() => window.confirm("¿Estás seguro de vaciar el carrito?") && clearCart()}
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
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal ({totalItems} items)</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>

        <div className="summary-row">
          <span>Envío</span>
          <span className="free-shipping">{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
        </div>

        {shipping > 0 && (
          <div className="shipping-note">
            ¡Faltan {formatPrice(100 - totalPrice)} para envío gratis!
          </div>
        )}

        <div className="summary-row tax-row">
          <span>Impuestos (21%)</span>
          <span>{formatPrice(taxes)}</span>
        </div>

        <div className="summary-divider"></div>

        <div className="summary-total">
          <span>Total</span>
          <span className="total-amount">{formatPrice(total)}</span>
        </div>

        <div className="summary-actions">
          <a href="/checkout" className="checkout-btn">Proceder al Pago</a>
          <a href="/products" className="continue-shopping">← Seguir comprando</a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
