import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../firebase/services";
import "./CheckoutForm.css";

const CheckoutForm = ({ onOrderCreated }) => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const orderData = {
        buyer: formData,
        items: cart.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        total: getTotalPrice(),
        date: new Date().toISOString(),
        status: "pending",
      };

      const orderId = await createOrder(orderData);
      onOrderCreated(orderId);
      clearCart();
    } catch (err) {
      console.error("Error creating order:", err);
      setError("Hubo un error al procesar tu orden. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.zipCode.trim() !== ""
    );
  };

  return (
    <div className="checkout-form-container">
      <form onSubmit={handleSubmit} className="checkout-form">
        <h3>Información de Contacto</h3>

        <div className="form-group">
          <label htmlFor="name">Nombre completo *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Juan Pérez"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="juan@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+54 11 1234-5678"
            />
          </div>
        </div>

        <h3>Dirección de Envío</h3>

        <div className="form-group">
          <label htmlFor="address">Dirección *</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Calle Falsa 123"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">Ciudad *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Buenos Aires"
            />
          </div>

          <div className="form-group">
            <label htmlFor="zipCode">Código Postal *</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              placeholder="1000"
            />
          </div>
        </div>

        {error && (
          <div className="form-error">
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          className="submit-btn"
          disabled={!isFormValid() || loading}
        >
          {loading ? "Procesando..." : "Confirmar Compra"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
