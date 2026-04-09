import { LayoutDashboard, Users, Folder, Bell } from "lucide-react";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Mọi thứ đã được bảo vệ bởi Middleware.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Dự án", value: "12", icon: Folder, color: "text-brand", bg: "bg-blue-50" },
          { label: "Thành viên", value: "48", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Hiệu suất", value: "85%", icon: LayoutDashboard, color: "text-green-600", bg: "bg-green-50" },
          { label: "Thông báo", value: "03", icon: Bell, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}