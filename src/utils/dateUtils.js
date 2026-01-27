/**
 * Formatea una fecha a formato legible
 * @param {string|Date} date - Fecha a formatear
 * @param {string} format - Formato deseado
 * @returns {string} Fecha formateada
 */
export const formatDate = (date, format = "short") => {
  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "Fecha inválida";
  }

  const options = {
    short: {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
    long: {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
    time: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    },
    datetime: {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  };

  const selectedOptions = options[format] || options.short;

  return new Intl.DateTimeFormat("es-AR", selectedOptions).format(dateObj);
};

/**
 * Calcula la fecha estimada de entrega
 * @param {number} shippingDays - Días estimados de envío
 * @returns {Object} Fecha estimada de entrega
 */
export const calculateDeliveryDate = (shippingDays = 7) => {
  const today = new Date();
  const deliveryDate = new Date(today);

  // Sumar días hábiles (excluyendo fines de semana)
  let daysAdded = 0;
  while (daysAdded < shippingDays) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);

    // Si no es sábado (6) ni domingo (0)
    if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) {
      daysAdded++;
    }
  }

  return {
    date: deliveryDate,
    formatted: formatDate(deliveryDate, "long"),
    daysFromNow: shippingDays,
  };
};

/**
 * Verifica si una fecha está dentro de un rango
 * @param {Date} date - Fecha a verificar
 * @param {Date} startDate - Fecha de inicio
 * @param {Date} endDate - Fecha de fin
 * @returns {boolean} True si la fecha está en el rango
 */
export const isDateInRange = (date, startDate, endDate) => {
  const checkDate = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);

  return checkDate >= start && checkDate <= end;
};

/**
 * Formatea la duración en minutos a horas y minutos
 * @param {number} minutes - Duración en minutos
 * @returns {string} Duración formateada
 */
export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins} min`;
  } else if (mins === 0) {
    return `${hours} h`;
  } else {
    return `${hours} h ${mins} min`;
  }
};
