import { useState } from "react";
import { Routes, Route } from "react-router";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import SupportPage from "./SupportPage";
import ProductDetailPage from "./ProductDetailPage";
import Footer from "../components/Footer";

const CustomerHomePage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-100">
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerHomePage;
