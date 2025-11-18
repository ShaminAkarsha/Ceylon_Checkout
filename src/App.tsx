import { CartProvider } from "./context/CartContext";
import { BrowserRouter, Route, Routes } from "react-router";
import CustomerHomePage from "./pages/CustomerHomePage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
          <CartProvider>
    
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
            <Route path="/*" element={<CustomerHomePage />} />
            <Route path="/admin/*" element={<div>Admin Page - To be implemented</div>} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </BrowserRouter>
          </CartProvider>

  );
}

export default App;
