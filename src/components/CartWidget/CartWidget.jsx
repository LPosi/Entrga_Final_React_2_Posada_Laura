import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./CartWidget.css";

const CartWidget = () => {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="cart-widget">
      <span className="cart-icon">🛒</span>
      {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
    </Link>
  );
};

export default CartWidget;