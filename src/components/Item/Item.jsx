import { useState, useEffect } from "react";
import ItemList from "../../components/ItemList/ItemList";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        title: "iPhone 13",
        price: 999.99,
        description: "Smartphone de última generación",
        category: "electronics",
        image:
          "https://images.unsplash.com/photo-1632661674596-df8be070d8c6?w=300",
        stock: 10,
      },
      {
        id: 2,
        title: "Camiseta Básica",
        price: 29.99,
        description: "Camiseta de algodón 100%",
        category: "clothing",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
        stock: 3,
      },
      {
        id: 3,
        title: "El Principito",
        price: 15.99,
        description: "Libro clásico de Antoine de Saint-Exupéry",
        category: "books",
        image:
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w-300",
        stock: 25,
      },
      {
        id: 4,
        title: "Auriculares Bluetooth",
        price: 89.99,
        description: "Auriculares con cancelación de ruido",
        category: "electronics",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
        stock: 15,
      },
      {
        id: 5,
        title: "Zapatillas Deportivas",
        price: 129.99,
        description: "Zapatillas para running",
        category: "clothing",
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
        stock: 8,
      },
      {
        id: 6,
        title: "Cafetera Express",
        price: 249.99,
        description: "Cafetera automática para espresso",
        category: "home",
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300",
        stock: 0,
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
