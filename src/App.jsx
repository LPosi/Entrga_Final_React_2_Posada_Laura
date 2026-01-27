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
            {/* Home puede mostrar destacados o bienvenida */}
            <Route path="/" element={<Home />} />

            {/* Todos los productos */}
            <Route path="/products" element={<ItemListContainer />} />

            {/* Productos por categoría */}
            <Route
              path="/category/:categoryId"
              element={<ItemListContainer />}
            />

            {/* Detalle de producto */}
            <Route
              path="/product/:productId"
              element={<ItemDetailContainer />}
            />

            {/* Carrito */}
            <Route path="/cart" element={<CartPage />} />

            {/* Checkout */}
            <Route path="/checkout" element={<Checkout />} />

            {/* Ruta no encontrada */}
            <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;