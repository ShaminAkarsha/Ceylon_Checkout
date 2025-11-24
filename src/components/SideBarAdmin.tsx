import { NavLink } from "react-router";
import { LayoutDashboard, Boxes, Settings, GalleryHorizontalEnd } from "lucide-react";

interface Props {
  isOpen: boolean;
}

export default function SidebarAdmin({ isOpen }: Props) {
  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-emerald-900 text-white 
      transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}
    >
      <div className="flex items-center justify-center h-16 text-xl font-bold border-b border-emerald-800">
        {isOpen ? "Admin" : "A"}
      </div>

      <nav className="mt-4 space-y-2">
        <SidebarItem to="/admin" icon={<LayoutDashboard />} label="Dashboard" isOpen={isOpen} end />
        <SidebarItem to="/admin/products" icon={<GalleryHorizontalEnd />} label="Products" isOpen={isOpen} />
        <SidebarItem to="/admin/adapters" icon={<Boxes />} label="Adapters" isOpen={isOpen} />
        <SidebarItem to="/admin/settings" icon={<Settings />} label="Settings" isOpen={isOpen} />
      </nav>
    </aside>
  );
}

function SidebarItem({
  to,
  icon,
  label, 
  isOpen,
  end,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 hover:bg-emerald-600 transition 
        ${isActive ? "bg-emerald-600 border-l-4 border-emerald-300" : ""}`
      }
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </NavLink>
  );
}
