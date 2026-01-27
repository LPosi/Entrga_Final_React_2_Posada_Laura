import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home.jsx";
import ItemListContainer from "./containers/ItemListContainer/ItemListContainer.jsx";
import ItemDetailContainer from "./containers/ItemDetailContainer/ItemDetailContainer.jsx";
import CartPage from "./pages/CartPage/CartPage.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ItemListContainer />} />
            <Route path="/category/:categoryId" element={<ItemListContainer />} />
            <Route path="/product/:productId" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;