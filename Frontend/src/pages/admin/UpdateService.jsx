import Sidebar from "../../components/admin/SidebarAdmin";
import Topbar from "../../components/admin/TopbarAdmin";
import UpdateServiceAdmin from "../../components/admin/UpdateServiceAdmin";

export default function UpdateService() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        <Topbar />
        <UpdateServiceAdmin />
      </main>
    </div>
  );
}
