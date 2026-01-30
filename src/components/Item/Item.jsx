import { useState, useEffect } from "react";
import ItemList from "../../components/ItemList/ItemList";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        category: "Books",
        description: "Arte",
        title: "El Camino del Artista",
        image: "https://acdn-us.mitiendanube.com/stores/004/088/117/products/665254-8e4b6866026160967217292987517106-1024-1024.webp",
        price: 38299,
        stock: 80,
      },
      {
        id: 2,
        category: "Clothing",
        description: "Camiseta 100% algodón",
        title: "Camiseta Básica",
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_743074-MLA105239755704_012026-F.webp",
        price: 7000,
        stock: 100,
      },
      {
        id: 3,
        category: "Electronics",
        description: "Smartphone Apple con Cámara Profesional",
        title: "Apple iPhone 17 Pro Max",
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_995082-MLA104668957585_012026-F.webp",
        price: 2999999,
        stock: 50,
      },
      {
        id: 4,
        category: "Electronics",
        description: "Laptop Apple con chip M2",
        title: "MacBook Air M2",
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_997020-MLA98773850565_112025-F.webp",
        price: 2885759,
        stock: 2,
      },
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "30px", color: "#2c3e50" }}>
        Nuestros Productos
      </h1>
      <ItemList products={products} />
    </div>
  );
};

export default ItemListContainer;
