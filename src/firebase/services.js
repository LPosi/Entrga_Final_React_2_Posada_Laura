import { collection, getDocs, getDoc, doc, query, where, addDoc } from "firebase/firestore";
import { db } from "./config";

export const getProducts = async () => {
  try {
    const productsCollection = collection(db, "products");
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().Title,
      description: doc.data().Description,
      category: doc.data().Category,
      image: doc.data().Image,
      price: doc.data().Price,
      stock: doc.data().Stock
    }));
  } catch {
    return [];
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const productsCollection = collection(db, "products");
    const q = query(productsCollection, where("Category", "==", categoryId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().Title,
      description: doc.data().Description,
      category: doc.data().Category,
      image: doc.data().Image,
      price: doc.data().Price,
      stock: doc.data().Stock
    }));
  } catch {
    return [];
  }
};

export const getProductById = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    const snapshot = await getDoc(productRef);
    if (!snapshot.exists()) return null;
    return {
      id: snapshot.id,
      name: snapshot.data().Title,
      description: snapshot.data().Description,
      category: snapshot.data().Category,
      image: snapshot.data().Image,
      price: snapshot.data().Price,
      stock: snapshot.data().Stock
    };
  } catch {
    return null;
  }
};

export const createOrder = async (order) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), order);
    return docRef.id;
  } catch {
    return null;
  }
};