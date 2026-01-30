import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import ItemCount from "../ItemCount/ItemCount";
import "./ItemDetail.css";

const ItemDetail = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAdd = (quantity) => {
    addToCart({ ...product, quantity });
  };

  if (!product) {
    return <p>Cargando producto...</p>;
  }

  return (
    <div className="item-detail-container">
      <h2>{product.title}</h2>

      <div className="item-detail-image">
        <img src={product.image} alt={product.title} />
      </div>

      <p className="item-detail-category">{product.category}</p>
      <p className="item-detail-description">{product.description}</p>
      <p className="item-detail-price">${product.price}</p>

      <ItemCount
        stock={product.stock}
        initial={1}
        onAdd={handleAdd}
      />
    </div>
  );
};

export default ItemDetail;
