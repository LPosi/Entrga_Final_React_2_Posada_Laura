export const filterProducts = (products, filters) => {
  if (!products || !Array.isArray(products)) return [];
  if (!filters) return products;

  return products.filter((product) => {
    if (!product) return false;

    const matchesCategory =
      !filters.category ||
      filters.category === "all" ||
      (product.category && product.category === filters.category);

    const matchesMinPrice =
      !filters.minPrice ||
      filters.minPrice === "" ||
      (product.price && product.price >= Number(filters.minPrice));

    const matchesMaxPrice =
      !filters.maxPrice ||
      filters.maxPrice === "" ||
      (product.price && product.price <= Number(filters.maxPrice));

    const matchesStock =
      !filters.inStockOnly ||
      filters.inStockOnly === false ||
      (product.stock && product.stock > 0);

    const matchesSearch =
      !filters.searchQuery ||
      filters.searchQuery.trim() === "" ||
      (product.title &&
        product.title
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())) ||
      (product.description &&
        product.description
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())) ||
      (product.category &&
        product.category
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()));

    return (
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesStock &&
      matchesSearch
    );
  });
};

export const sortProducts = (products, sortBy) => {
  if (!products || !Array.isArray(products)) return [];
  if (!sortBy) return [...products];

  const sorted = [...products].filter((product) => product && product.title);

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    case "price-desc":
      return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    case "name-asc":
      return sorted.sort((a, b) =>
        (a.title || "").localeCompare(b.title || "")
      );
    case "name-desc":
      return sorted.sort((a, b) =>
        (b.title || "").localeCompare(a.title || "")
      );
    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
    case "oldest":
      return sorted.sort(
        (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
      );
    default:
      return sorted;
  }
};

export const formatPrice = (price, currency = "$") => {
  if (price === null || price === undefined) {
    return `${currency}0.00`;
  }

  let numericPrice;

  if (typeof price === "string") {
    const cleanedPrice = price.replace(/[^\d.,-]/g, "");
    numericPrice = parseFloat(cleanedPrice.replace(",", ".")) || 0;
  } else if (typeof price === "number") {
    numericPrice = price;
  } else {
    numericPrice = 0;
  }

  if (isNaN(numericPrice) || !isFinite(numericPrice)) {
    numericPrice = 0;
  }

  const roundedPrice = Math.round(numericPrice * 100) / 100;
  const parts = roundedPrice.toFixed(2).split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${currency}${integerPart}.${parts[1]}`;
};

export const calculateCartTotal = (cartItems) => {
  if (!cartItems || !Array.isArray(cartItems)) return 0;

  return cartItems.reduce((total, item) => {
    if (!item) return total;
    const price = item.price || 0;
    const quantity = item.quantity || 1;
    return total + price * quantity;
  }, 0);
};

export const applyDiscount = (price, discountPercentage) => {
  const numericPrice = parseFloat(price) || 0;
  const numericDiscount = parseFloat(discountPercentage) || 0;

  if (numericDiscount <= 0) return numericPrice;
  if (numericDiscount >= 100) return 0;

  return numericPrice * (1 - numericDiscount / 100);
};

const ProductUtils = {
  filterProducts,
  sortProducts,
  formatPrice,
  calculateCartTotal,
  applyDiscount,
};

export default ProductUtils;
