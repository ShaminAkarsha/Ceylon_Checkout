import { CartProvider } from "./context/CartContext";
import { BrowserRouter, Route, Routes } from "react-router";
import CustomerHomePage from "./pages/CustomerHomePage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
          <CartProvider>
    
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
            <Route path="/*" element={<CustomerHomePage />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </BrowserRouter>
          </CartProvider>

  );
}

export default App;
