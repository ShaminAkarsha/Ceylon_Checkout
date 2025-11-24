import { ArrowDown, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import logoImage from "../Assets/logoS.png";

export default function NavbarAdmin({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void; 
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="h-16 bg-white shadow-sm px-6 flex items-center justify-between border-b border-emerald-100">
      {/* LEFT SECTION: Logo + Menu */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded hover:bg-emerald-50 transition text-emerald-700"
        >
          <Menu />
        </button>

        <Link to="/admin" className="flex items-center gap-2">
          {/* Logo */}
          <img
            src={logoImage}
            alt="Ceylon Treasures Logo"
            className="h-8 w-8 object-contain"
          />
          <span className="text-l font-bold text-emerald-800">Ceylon Treasures</span>
        </Link>
      </div>

      {/* RIGHT SECTION: Profile */}
      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="cursor-pointerflex flex items-center gap-1 cursor-pointer select-none"
        >
          <span className="text-sm font-medium hidden sm:block text-emerald-700">Admin</span>

          <div className="flex items-center gap-2 p-1 hover:bg-emerald-50 rounded text-emerald-700">
            <ArrowDown size={17} />
          </div>
        </div>
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg border border-emerald-100">
            <button className="w-full px-4 py-2 hover:bg-emerald-50 text-left text-gray-700">
              Profile
            </button>
            <button className="w-full px-4 py-2 hover:bg-emerald-50 text-left text-red-600">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
