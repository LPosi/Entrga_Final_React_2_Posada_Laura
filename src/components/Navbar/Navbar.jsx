import { Link } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Mi Ecommerce</Link>
      </div>

      <ul className="navbar-menu">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/products">Productos</Link>
        </li>
        <li>
          <Link to="/category/electronics">Electrónica</Link>
        </li>
        <li>
          <Link to="/category/clothing">Ropa</Link>
        </li>
        <li>
          <Link to="/category/books">Libros</Link>
        </li>
      </ul>

      <div className="navbar-cart">
        <CartWidget />
      </div>
    </nav>
  );
};

export default Navbar;
