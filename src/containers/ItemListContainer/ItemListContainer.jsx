import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../../components/ItemList/ItemList";
import { getProducts, getProductsByCategory } from "../../firebase/services";
import "./ItemListContainer.css";

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let data = [];

        if (categoryId) {
          data = await getProductsByCategory(categoryId);
        } else {
          data = await getProducts();
        }

        if (!Array.isArray(data) || data.length === 0) {
          setError("No se encontraron productos.");
          setProducts([]);
        } else {
          setProducts(
            data.map(product => ({
              ...product,
              isNew: Math.random() > 0.7,
              featured: Math.random() > 0.8,
              rating: (Math.random() * 2 + 3).toFixed(1),
              reviewCount: Math.floor(Math.random() * 100),
              originalPrice: Math.random() > 0.3 ? null : product.price * 1.5
            }))
          );
        }
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("Error al cargar los productos. Por favor, intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Reintentar
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="no-products">
        <h2>No hay productos disponibles</h2>
      </div>
    );
  }

  return (
    <div className="item-list-container-page">
      <div className="container-header">
        <h1>
          {categoryId
            ? `Productos de ${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}`
            : "Todos los Productos"}
        </h1>
        <p className="subtitle">{products.length} productos disponibles</p>
      </div>

      <ItemList products={products} />
    </div>
  );
};

export default ItemListContainer;