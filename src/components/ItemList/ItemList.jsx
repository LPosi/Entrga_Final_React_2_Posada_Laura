import { useState } from "react";
import { filterProducts, sortProducts } from "../../utils/productUtils";
import Item from "../Item/Item";
import "./ItemList.css";

const ItemList = ({ products = [] }) => {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === "" || product.category === category;
    const matchesSearch = search === "" || 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (products.length === 0) {
    return (
      <div className="item-list-empty">
        <div className="empty-icon">📦</div>
        <h3>No hay productos disponibles</h3>
        <p>Pronto agregaremos nuevos productos.</p>
      </div>
    );
  }

  return (
    <div className="item-list-container">
      <div className="list-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="category-filter">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">Todas las categorías</option>
            <option value="electronics">Electrónica</option>
            <option value="clothing">Ropa</option>
            <option value="books">Libros</option>
            <option value="home">Hogar</option>
            <option value="sports">Deportes</option>
          </select>
        </div>

        <button 
          onClick={() => {
            setCategory("");
            setSearch("");
          }} 
          className="reset-btn"
        >
          Limpiar filtros
        </button>
      </div>

      <div className="results-info">
        <span className="results-count">
          {filteredProducts.length} de {products.length} productos
        </span>
        {search && (
          <span className="search-term">Buscando: "{search}"</span>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="item-list-grid">
          {filteredProducts.map((product) => (
            <Item key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <div className="no-results-icon">😞</div>
          <h3>No se encontraron productos</h3>
          <p>Prueba con otros filtros o términos de búsqueda.</p>
          <button 
            onClick={() => {
              setCategory("");
              setSearch("");
            }} 
            className="reset-search-btn"
          >
            Ver todos los productos
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemList;