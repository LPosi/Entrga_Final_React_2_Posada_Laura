/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {Object} Resultado de validación
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  return {
    isValid,
    message: isValid ? "" : "Por favor ingresa un email válido",
  };
};

/**
 * Valida un número de teléfono
 * @param {string} phone - Teléfono a validar
 * @returns {Object} Resultado de validación
 */
export const validatePhone = (phone) => {
  // Eliminar espacios, guiones y paréntesis
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  const phoneRegex = /^\+?[1-9]\d{9,14}$/;
  const isValid = phoneRegex.test(cleaned);

  return {
    isValid,
    message: isValid ? "" : "Por favor ingresa un número de teléfono válido",
  };
};

/**
 * Valida un código postal (Argentina)
 * @param {string} zipCode - Código postal a validar
 * @returns {Object} Resultado de validación
 */
export const validateZipCode = (zipCode) => {
  const zipRegex = /^[A-Za-z]\d{4}[A-Za-z]{3}$|^\d{4,5}$/;
  const isValid = zipRegex.test(zipCode);

  return {
    isValid,
    message: isValid ? "" : "Por favor ingresa un código postal válido",
  };
};

/**
 * Valida una tarjeta de crédito (Luhn algorithm)
 * @param {string} cardNumber - Número de tarjeta
 * @returns {Object} Resultado de validación
 */
export const validateCreditCard = (cardNumber) => {
  // Eliminar espacios y guiones
  const cleaned = cardNumber.replace(/[\s\-]/g, "");

  // Verificar que solo contenga números
  if (!/^\d+$/.test(cleaned)) {
    return {
      isValid: false,
      message: "El número de tarjeta solo debe contener dígitos",
    };
  }

  // Algoritmo de Luhn
  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  const isValid = sum % 10 === 0;

  return {
    isValid,
    message: isValid ? "" : "Número de tarjeta inválido",
  };
};

/**
 * Valida una fecha de vencimiento de tarjeta
 * @param {string} month - Mes (MM)
 * @param {string} year - Año (YY)
 * @returns {Object} Resultado de validación
 */
export const validateCardExpiry = (month, year) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const cardYear = 2000 + parseInt(year, 10);
  const cardMonth = parseInt(month, 10);

  const isValid =
    cardYear > currentYear ||
    (cardYear === currentYear && cardMonth >= currentMonth);

  return {
    isValid,
    message: isValid ? "" : "La tarjeta ha expirado o está cerca de expirar",
  };
};

/**
 * Valida el código de seguridad (CVV)
 * @param {string} cvv - Código de seguridad
 * @param {string} cardType - Tipo de tarjeta
 * @returns {Object} Resultado de validación
 */
export const validateCVV = (cvv, cardType = "visa") => {
  const cvvLength =
    {
      visa: 3,
      mastercard: 3,
      amex: 4,
    }[cardType] || 3;

  const isValid = /^\d+$/.test(cvv) && cvv.length === cvvLength;

  return {
    isValid,
    message: isValid ? "" : `El CVV debe tener ${cvvLength} dígitos`,
  };
};
