import { Search, ShoppingCart, Palmtree, LogIn } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link, useLocation } from "react-router";
import { useState } from "react";
import LoginModal from "./LoginModal";

interface NavbarProps {
  onCartOpen: () => void;
}

export default function Navbar({ onCartOpen }: NavbarProps) {
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();
  const currentPath = location.pathname;
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div>
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-6xl z-50">
        <div className="backdrop-blur-md bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl shadow-2xl">
          <div className="px-6 sm:px-8 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2 cursor-pointer">
              <Palmtree className="h-7 w-7 text-emerald-400" />
              <span className="text-xl font-bold text-white">
                Ceylon Treasures
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPath === "/"
                    ? "bg-white bg-opacity-20 text-white"
                    : "text-white hover:bg-white hover:bg-opacity-10"
                }`}
              >
                Home
              </Link>

              <Link
                to="/search"
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPath === "/search"
                    ? "bg-white bg-opacity-20 text-white"
                    : "text-white hover:bg-white hover:bg-opacity-10"
                }`}
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </Link>

              <Link
                to="/support"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPath === "/support"
                    ? "bg-white bg-opacity-20 text-white"
                    : "text-white hover:bg-white hover:bg-opacity-10"
                }`}
              >
                Support
              </Link>
            </div>
            <div className="flex">
              <button
                onClick={onCartOpen}
                className="relative p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="relative p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200"
              >
                <LogIn className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={(creds) => {
          // Replace with real auth integration; for now just log and close
          console.log("Login attempt", creds);
        }}
      />
    </div>
  );
}
