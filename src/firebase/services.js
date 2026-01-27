import { collection, getDocs, getDoc, doc, query, where } from "firebase/firestore";
import { db } from "Config";

export const getProducts = async () => {
  try {
    const productsCollection = collection(db, "products");
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const productsCollection = collection(db, "products");
    const q = query(productsCollection, where("category", "==", categoryId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    return [];
  }
};

export const getProductById = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    const snapshot = await getDoc(productRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() };
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    return null;
  }
};