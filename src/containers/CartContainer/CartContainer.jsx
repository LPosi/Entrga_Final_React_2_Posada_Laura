import { useState, useEffect } from "react";
import Cart from "../components/Cart/Cart";
import { useCart } from "../context/CartContext";
import { calculateTotals, applyDiscount } from "../utils/cartCalculations";
import { createOrder } from "../firebase/services";
import { toast } from "react-toastify";

const CartContainer = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);

  const { subtotal, tax, total } = calculateTotals(cart);

  const finalTotal = discountApplied
    ? applyDiscount(total, discountApplied.percentage)
    : total;

  useEffect(() => {
    if (subtotal === 0) setShippingCost(0);
    else if (subtotal > 100) setShippingCost(0);
    else setShippingCost(10);
  }, [subtotal]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(productId);
      toast.info("Producto eliminado del carrito");
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) {
      toast.error("Ingresa un código de descuento");
      return;
    }

    const validCodes = {
      DESCUENTO10: 10,
      BLACKFRIDAY: 20,
      BIENVENIDA: 15,
    };

    const percentage = validCodes[discountCode.toUpperCase()];

    if (percentage) {
      setDiscountApplied({
        code: discountCode.toUpperCase(),
        percentage,
      });
      toast.success(`Descuento del ${percentage}% aplicado`);
    } else {
      toast.error("Código de descuento inválido");
    }

    setDiscountCode("");
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("El carrito está vacío");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        items: cart,
        subtotal,
        tax,
        shipping: shippingCost,
        discount: discountApplied,
        total: finalTotal + shippingCost,
        date: new Date().toISOString(),
        status: "generated",
      };

      const orderId = await createOrder(orderData);

      toast.success(`Compra realizada. Orden: ${orderId}`);

      clearCart();

      setTimeout(() => {
        window.location.href = `/order-confirmation/${orderId}`;
      }, 1500);
    } catch (error) {
      toast.error("Error al procesar la compra");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = (productId) => {
    removeItem(productId);
    toast.info("Producto eliminado");
  };

  const handleClearCart = () => {
    if (window.confirm("¿Vaciar carrito?")) {
      clearCart();
      setDiscountApplied(null);
      toast.info("Carrito vaciado");
    }
  };

  return (
    <Cart
      items={cart}
      loading={loading}
      subtotal={subtotal}
      tax={tax}
      shipping={shippingCost}
      discount={discountApplied}
      total={finalTotal + shippingCost}
      discountCode={discountCode}
      setDiscountCode={setDiscountCode}
      onQuantityChange={handleQuantityChange}
      onRemoveItem={handleRemoveItem}
      onApplyDiscount={handleApplyDiscount}
      onCheckout={handleCheckout}
      onClearCart={handleClearCart}
      isEmpty={cart.length === 0}
    />
  );
};

export default CartContainer;