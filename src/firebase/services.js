import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      throw new Error("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error getting product by ID:", error);
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const q = query(
      collection(db, "products"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting products by category:", error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const orderWithTimestamp = {
      ...orderData,
      createdAt: Timestamp.now(),
      status: "pending",
    };

    const docRef = await addDoc(collection(db, "orders"), orderWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const checkStock = async (cartItems) => {
  try {
    const stockPromises = cartItems.map(async (item) => {
      const product = await getProductById(item.id);
      return {
        id: item.id,
        requested: item.quantity,
        available: product.stock,
        hasStock: item.quantity <= product.stock,
      };
    });

    return await Promise.all(stockPromises);
  } catch (error) {
    console.error("Error checking stock:", error);
    throw error;
  }
};
