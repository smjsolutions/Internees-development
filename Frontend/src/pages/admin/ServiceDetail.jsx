import Sidebar from "../../components/admin/SidebarAdmin";
import Topbar from "../../components/admin/TopbarAdmin";
import ServiceDetailsAdmin from "../../components/admin/ServiceDetailAdmin";
import { useState } from "react";

export default function ServiceDetail() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <Topbar setSidebarOpen={setSidebarOpen} />

        {/* Scrollable main section */}
        <div className="flex-1 p-4 sm:p-6 overflow-auto">
          <ServiceDetailsAdmin />
        </div>
      </main>
    </div>
  );
}
