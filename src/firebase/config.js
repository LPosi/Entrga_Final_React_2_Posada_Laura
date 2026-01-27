import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJulCkPCTOAT6Fb7sedHIOdArZbztRf_Y",
  authDomain: "e-commerce-posada-laura.firebaseapp.com",
  projectId: "e-commerce-posada-laura",
  storageBucket: "e-commerce-posada-laura.firebasestorage.app",
  messagingSenderId: "537922515420",
  appId: "1:537922515420:web:b9a8cdbb019beb2a191f19",
  measurementId: "G-FQKTR5L38Z",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };
