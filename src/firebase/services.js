import { collection, getDocs, getDoc, doc, query, where, addDoc } from "firebase/firestore";
import { db } from "./config";

export const getProducts = async () => {
  try {
    const productsCollection = collection(db, "products");
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      title: docSnap.data().title,
      description: docSnap.data().description,
      category: docSnap.data().category,
      image: docSnap.data().image,
      price: docSnap.data().price,
      stock: docSnap.data().stock
    }));
  } catch {
    return [];
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const productsCollection = collection(db, "products");
    const q = query(productsCollection, where("category", "==", categoryId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      title: docSnap.data().title,
      description: docSnap.data().description,
      category: docSnap.data().category,
      image: docSnap.data().image,
      price: docSnap.data().price,
      stock: docSnap.data().stock
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
      title: snapshot.data().title,
      description: snapshot.data().description,
      category: snapshot.data().category,
      image: snapshot.data().image,
      price: snapshot.data().price,
      stock: snapshot.data().stock
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