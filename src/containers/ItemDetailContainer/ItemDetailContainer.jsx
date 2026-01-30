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
      setLoading(true);
      try {
        const data = await getProductById(productId);
        if (!data) {
          setError("Producto no encontrado");
          return;
        }
        setProduct(data);
      } catch {
        setError("No se pudo cargar el producto. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;

  return <ItemDetail product={product} />;
};

export default ItemDetailContainer;