import { useState, useEffect } from "react";
import ItemList from "../../components/ItemList/ItemList";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        Category: "Books",
        Description: "Arte"
        Image: "https://acdn-us.mitiendanube.com/stores/004/088/117/products/665254-8e4b6866026160967217292987517106-1024-1024.webp",
        Price: 38299
        Stock: 80
        Title: "El Camino del Artista"
      },
      {
        id: 2,
        Category: "Clothing",
        Description: "Camiseta 100% algodón",
        Price: 7000,
        Stock: 100,
        Title: "Camiseta Básica",
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_743074-MLA105239755704_012026-F.webp",
      },
      {
        id: 3,
        Category: "Electronics",
        Description: "Smartphone Apple con Cámara Profesional",
        Image: "https://http2.mlstatic.com/D_NQ_NP_2X_995082-MLA104668957585_012026-F.webp",
        Price: 2999999,
        Stock: 50,
        Title: "Apple iPhone 17 Pro Max"
      },
      {
        id: 4,
        Category: "electronics",
        Description: "Laptop Apple con chip M2",
        Image: "https://http2.mlstatic.com/D_NQ_NP_2X_997020-MLA98773850565_112025-F.webp",
        Price: 2885759,
        Stock: 2,
        Title: "MacBook Air M2"
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
