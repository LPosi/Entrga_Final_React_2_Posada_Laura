import { Link } from "react-router-dom";

const Item = ({ product }) => {
  return (
    <div className="item-card">
      <img
        src={product.image}
        alt={product.title}
        className="item-image"
      />

      <h3 className="item-title">{product.title}</h3>
      <p className="item-description">{product.description}</p>

      <p className="item-price">
        ${product.price.toLocaleString("es-AR")}
      </p>

      <Link to={`/product/${product.id}`} className="item-button">
        Ver detalle
      </Link>
    </div>
  );
};

export default Item;
