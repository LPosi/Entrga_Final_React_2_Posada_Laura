import React, { useState, useEffect } from "react";
import Cart from "../components/Cart/Cart";
import { useCart } from "../context/CartContext";
import { calculateTotals, applyDiscount } from "../utils/cartCalculations";
import { checkout } from "../services";
import { toast } from "react-toastify";

const CartContainer = () => {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);

  const { subtotal, tax, total } = calculateTotals(cartItems);

  const finalTotal = discountApplied
    ? applyDiscount(total, discountApplied.percentage)
    : total;

  useEffect(() => {
    const calculateShipping = () => {
      if (subtotal === 0) return 0;
      if (subtotal > 100) return 0;
      return 10;
    };

    setShippingCost(calculateShipping());
  }, [subtotal]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(productId);
      toast.info("Producto eliminado del carrito");
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      toast.error("Ingresa un código de descuento");
      return;
    }

    setLoading(true);
    try {
      const validCodes = {
        DESCUENTO10: 10,
        BLACKFRIDAY: 20,
        BIENVENIDA: 15,
      };

      if (validCodes[discountCode.toUpperCase()]) {
        const discount = {
          code: discountCode.toUpperCase(),
          percentage: validCodes[discountCode.toUpperCase()],
          valid: true,
        };

        setDiscountApplied(discount);
        toast.success(`Descuento del ${discount.percentage}% aplicado`);
      } else {
        toast.error("Código de descuento inválido");
      }
    } catch (error) {
      toast.error("Error al aplicar descuento");
      console.error(error);
    } finally {
      setLoading(false);
      setDiscountCode("");
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("El carrito está vacío");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: cartItems,
        subtotal,
        tax,
        shipping: shippingCost,
        discount: discountApplied,
        total: finalTotal + shippingCost,
        timestamp: new Date().toISOString(),
      };

      console.log("Procesando orden:", orderData);

      toast.success("¡Compra realizada con éxito!");

      setTimeout(() => {
        clearCart();

        window.location.href = "/order-confirmation";
      }, 1500);
    } catch (error) {
      toast.error("Error al procesar la compra");
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = (productId) => {
    removeItem(productId);
    toast.info("Producto eliminado");
  };

  const handleClearCart = () => {
    if (window.confirm("¿Estás seguro de vaciar el carrito?")) {
      clearCart();
      setDiscountApplied(null);
      toast.info("Carrito vaciado");
    }
  };

  const cartProps = {
    items: cartItems,
    loading,

    subtotal,
    tax,
    shipping: shippingCost,
    discount: discountApplied,
    total: finalTotal + shippingCost,

    discountCode,
    setDiscountCode,

    onQuantityChange: handleQuantityChange,
    onRemoveItem: handleRemoveItem,
    onApplyDiscount: handleApplyDiscount,
    onCheckout: handleCheckout,
    onClearCart: handleClearCart,

    isEmpty: cartItems.length === 0,
  };

  return <Cart {...cartProps} />;
};

export default CartContainer;
