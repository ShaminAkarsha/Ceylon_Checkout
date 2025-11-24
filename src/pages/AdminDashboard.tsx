import { Route, Routes } from "react-router";
import AdminLayout from "../Layouts/AdminLayout";
import AdaptersPage from "./Admin/AdaptersPage";
import SettingsPage from "./Admin/SettingsPage";
import AdminDashboardPage from "./Admin/AdminDashboardPage";
import ProductPage from "./Admin/ProductPage";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboardPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/adapters" element={<AdaptersPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </AdminLayout>
  );
}
