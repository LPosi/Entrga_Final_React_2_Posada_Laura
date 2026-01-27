/**
 * Calcula el subtotal del carrito
 * @param {Array} cartItems - Items del carrito
 * @returns {number} Subtotal
 */
export const calculateSubtotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return total + price * quantity;
  }, 0);
};

/**
 * Calcula el costo de envío
 * @param {number} subtotal - Subtotal del carrito
 * @param {string} shippingMethod - Método de envío
 * @returns {number} Costo de envío
 */
export const calculateShipping = (subtotal, shippingMethod = "standard") => {
  const methods = {
    standard: 5.99,
    express: 12.99,
    free: 0,
  };

  // Envío gratis para pedidos mayores a $100
  if (subtotal >= 100) {
    return methods.free;
  }

  return methods[shippingMethod] || methods.standard;
};

/**
 * Calcula impuestos (IVA 21%)
 * @param {number} subtotal - Subtotal del carrito
 * @returns {number} Impuestos
 */
export const calculateTax = (subtotal) => {
  return subtotal * 0.21; // 21% IVA
};

/**
 * Calcula el total final
 * @param {number} subtotal - Subtotal del carrito
 * @param {number} shipping - Costo de envío
 * @param {number} tax - Impuestos
 * @returns {number} Total final
 */
export const calculateTotal = (subtotal, shipping, tax) => {
  return subtotal + shipping + tax;
};

/**
 * Valida si hay suficiente stock para los items del carrito
 * @param {Array} cartItems - Items del carrito
 * @param {Array} products - Productos con stock actual
 * @returns {Object} Resultado de validación
 */
export const validateStock = (cartItems, products) => {
  const validation = {
    isValid: true,
    errors: [],
    outOfStockItems: [],
  };

  cartItems.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);

    if (!product) {
      validation.isValid = false;
      validation.errors.push(`Producto "${cartItem.title}" no encontrado`);
      validation.outOfStockItems.push(cartItem.id);
    } else if (product.stock < cartItem.quantity) {
      validation.isValid = false;
      validation.errors.push(
        `Stock insuficiente para "${cartItem.title}". Disponible: ${product.stock}, Solicitado: ${cartItem.quantity}`
      );
      validation.outOfStockItems.push(cartItem.id);
    }
  });

  return validation;
};

/**
 * Agrupa items del carrito por categoría
 * @param {Array} cartItems - Items del carrito
 * @returns {Object} Items agrupados por categoría
 */
export const groupCartItemsByCategory = (cartItems) => {
  return cartItems.reduce((groups, item) => {
    const category = item.category || "otros";

    if (!groups[category]) {
      groups[category] = {
        items: [],
        subtotal: 0,
        quantity: 0,
      };
    }

    groups[category].items.push(item);
    groups[category].subtotal += item.price * item.quantity;
    groups[category].quantity += item.quantity;

    return groups;
  }, {});
};
