import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import SurveyPage from "./pages/SurveyPage";

function AppLayout() {
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const isCheckout = location.pathname === "/checkout";

  return (
    <div className="min-h-screen flex flex-col">
      {!isCheckout && <Navbar onCartOpen={() => setCartOpen(true)} />}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage onCartOpen={() => setCartOpen(true)} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/survey" element={<SurveyPage />} />
        </Routes>
      </main>
      {!isCheckout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppLayout />
      </CartProvider>
    </BrowserRouter>
  );
}
