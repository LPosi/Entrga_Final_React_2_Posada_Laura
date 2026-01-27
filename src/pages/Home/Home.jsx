import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bienvenido a Mi Ecommerce</h1>
          <p>Los mejores productos al mejor precio</p>
          <Link to="/products" className="hero-btn">
            Ver productos
          </Link>
        </div>
      </section>

      <section className="categories-section">
        <h2>Categorías Destacadas</h2>
        <div className="categories-grid">
          <Link to="/category/electronics" className="category-card">
            <div className="category-icon">📱</div>
            <h3>Electrónica</h3>
            <p>Smartphones, laptops y más</p>
          </Link>

          <Link to="/category/clothing" className="category-card">
            <div className="category-icon">👕</div>
            <h3>Ropa</h3>
            <p>Moda para toda ocasión</p>
          </Link>

          <Link to="/category/books" className="category-card">
            <div className="category-icon">📚</div>
            <h3>Libros</h3>
            <p>Literatura y aprendizaje</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
