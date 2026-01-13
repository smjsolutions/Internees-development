import Sidebar from "../../components/admin/SidebarAdmin";
import Topbar from "../../components/admin/TopbarAdmin";
import StatCard from "../../components/admin/StatCardAdmin";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1">
        <Topbar />

        <section className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="New Users"
              value="8,282"
              color="bg-purple-500"
            />
            <StatCard
              title="Total Orders"
              value="200,521"
              color="bg-blue-500"
            />
            <StatCard
              title="Available Products"
              value="215,542"
              color="bg-pink-500"
            />
          </div>

        </section>
      </main>
    </div>
  );
}
