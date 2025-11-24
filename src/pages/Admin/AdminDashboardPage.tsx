import { Package, ShoppingCart, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = {
    totalProducts: 1240,
    totalOrders: 387,
    bestSource: "Bokun",
    sourceSales: 65, // percentage
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Package size={28} />}
          title="Total Products"
          value={stats.totalProducts}
        />

        <StatCard
          icon={<ShoppingCart size={28} />}
          title="Total Orders"
          value={stats.totalOrders}
        />

        <StatCard
          icon={<TrendingUp size={28} />}
          title="Top Source"
          value={`${stats.bestSource} (${stats.sourceSales}%)`}
        />
      </div>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
        </div>
        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
}
