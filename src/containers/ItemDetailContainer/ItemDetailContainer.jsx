import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../../firebase/services";
import ItemDetail from "../../components/ItemDetail/ItemDetail";

const ItemDetailContainer = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(productId);
        if (!data) throw new Error("Producto no encontrado");
        setProduct(data);
      } catch (err) {
        console.error("Error cargando producto:", err);
        setError("No se pudo cargar el producto. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return <ItemDetail product={product} />;
};

export default ItemDetailContainer;