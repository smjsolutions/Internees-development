import Sidebar from "../../components/admin/SidebarAdmin";
import Topbar from "../../components/admin/TopbarAdmin";
import Create from "../../components/admin/CreateServiceAdmin";

export default function CreateService() {
  return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
  
        <main className="flex-1">
          <Topbar />

<Create />
</main>
    </div>
  );
}
