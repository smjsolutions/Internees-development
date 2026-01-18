import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/SidebarAdmin";
import Topbar from "../../components/admin/TopbarAdmin";
import Create from "../../components/admin/CreatePackageAdmin";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CreatePackage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 flex flex-col min-w-0">
        <Topbar setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 p-4 sm:p-6 overflow-auto">
          <Create />
        </div>
      </main>
    </div>
  );
}
