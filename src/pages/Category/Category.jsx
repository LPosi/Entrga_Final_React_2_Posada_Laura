import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsByCategory } from "../../firebase/services";
import ItemList from "../../components/ItemList/ItemList";
import "./Category.css";

const Category = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryInfo = {
    electronics: {
      name: "Electrónica",
      description:
        "Los últimos dispositivos electrónicos, smartphones, laptops y accesorios tecnológicos.",
      icon: "📱",
      features: [
        "Tecnología de última generación",
        "Garantía oficial",
        "Envío gratis",
      ],
    },
    clothing: {
      name: "Ropa",
      description:
        "Moda para todas las ocasiones. Ropa casual, formal y deportiva de las mejores marcas.",
      icon: "👕",
      features: [
        "Tallas completas",
        "Materiales de calidad",
        "Devolución gratuita",
      ],
    },
    books: {
      name: "Libros",
      description:
        "Amplia selección de libros: literatura, académicos, bestsellers y mucho más.",
      icon: "📚",
      features: [
        "Entrega rápida",
        "Libros nuevos y usados",
        "Recomendaciones personalizadas",
      ],
    },
    home: {
      name: "Hogar",
      description:
        "Todo para tu hogar: muebles, decoración, electrodomésticos y artículos de cocina.",
      icon: "🏠",
      features: ["Diseño moderno", "Calidad garantizada", "Armado incluido"],
    },
    sports: {
      name: "Deportes",
      description:
        "Equipamiento deportivo, ropa de entrenamiento y accesorios para todas las actividades.",
      icon: "⚽",
      features: ["Marcas reconocidas", "Durabilidad", "Asesoramiento experto"],
    },
  };

  const currentCategory = categoryInfo[categoryId] || {
    name: categoryId || "Categoría",
    description: "Productos de esta categoría.",
    icon: "🛍️",
    features: [],
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        if (categoryId) {
          const data = await getProductsByCategory(categoryId);
          setProducts(data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Error al cargar los productos de esta categoría");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="category-loading">
        <div className="spinner"></div>
        <p>Cargando productos de {currentCategory.name}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-error">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/" className="back-btn">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="category-page">
      {/* Header de categoría */}
      <div className="category-header">
        <div className="category-header-content">
          <div className="category-icon-large">{currentCategory.icon}</div>
          <h1>{currentCategory.name}</h1>
          <p className="category-description">{currentCategory.description}</p>
          <div className="category-stats">
            <span className="stat">
              <strong>{products.length}</strong> productos
            </span>
            <span className="stat">
              <strong>✓</strong> Envío gratis
            </span>
            <span className="stat">
              <strong>🔄</strong> Devolución fácil
            </span>
          </div>
        </div>
      </div>

      {/* Características de la categoría */}
      {currentCategory.features.length > 0 && (
        <div className="category-features">
          <h3>¿Por qué comprar en {currentCategory.name}?</h3>
          <div className="features-grid">
            {currentCategory.features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">✓</div>
                <p>{feature}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Productos de la categoría */}
      <div className="category-products-section">
        <div className="section-header">
          <h2>Productos en {currentCategory.name}</h2>
          <p className="products-count">
            {products.length} productos disponibles
          </p>
        </div>

        {products.length > 0 ? (
          <ItemList products={products} />
        ) : (
          <div className="no-products">
            <div className="no-products-icon">😔</div>
            <h3>No hay productos en esta categoría</h3>
            <p>Pronto agregaremos más productos de {currentCategory.name}</p>
            <Link to="/products" className="btn-primary">
              Ver todos los productos
            </Link>
          </div>
        )}
      </div>

      {/* Otras categorías */}
      <div className="other-categories">
        <h3>Explora otras categorías</h3>
        <div className="categories-grid">
          {Object.entries(categoryInfo).map(
            ([id, cat]) =>
              id !== categoryId && (
                <Link
                  key={id}
                  to={`/category/${id}`}
                  className="category-card-small"
                >
                  <div className="category-card-icon">{cat.icon}</div>
                  <h4>{cat.name}</h4>
                  <p>Ver productos →</p>
                </Link>
              )
          )}
        </div>
      </div>

      {/* Banner promocional */}
      <div className="category-promo">
        <div className="promo-content">
          <h3>¿Necesitas ayuda para elegir?</h3>
          <p>
            Nuestros expertos pueden asesorarte para encontrar el producto
            perfecto.
          </p>
          <div className="promo-actions">
            <button className="promo-btn">Contactar asesor</button>
            <Link to="/" className="promo-link">
              Ver guías de compra
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
