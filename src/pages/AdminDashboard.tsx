import { Route, Routes } from "react-router";
import Footer from '../components/Footer';
import NavbarAdmin from "../components/NavbarAdmin";
import AdaptersPage from "./Admin/AdaptersPage";
import SettingsPage from "./Admin/SettingsPage";
import AdminDashboardPage from "./Admin/AdminDashboardPage";



export default function AdminDashboard() {
  return (
    <div className="bg-gray-100">
      <NavbarAdmin/>
      <main  className="min-h-screen">
        <Routes>
          <Route path="/" element={< AdminDashboardPage/>} />
          <Route path="/Adapters" element={<AdaptersPage />} />
          <Route path="/Settings" element={<SettingsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
