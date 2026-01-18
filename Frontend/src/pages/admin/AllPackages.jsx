import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/admin/SidebarAdmin";
import Topbar from "../../components/admin/TopbarAdmin";
import PackageTableAdmin from "../../components/admin/PackageTableAdmin";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AllPackagesAdmin() {
  const [packages, setPackages] = useState([]);   // ✅ FIXED
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ FETCH PACKAGES (NOT SERVICES)
  const fetchPackages = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/packages`);

      if (data.success) {
        setPackages(data.data);
      } else {
        setError("Failed to fetch packages");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching packages");
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div className="flex h-full bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-4 sm:p-6">
          {error && (
            <p className="text-red-600 text-center mb-4">{error}</p>
          )}

          {/* ✅ PASS PACKAGES */}
          <PackageTableAdmin packages={packages} />
        </main>
      </div>
    </div>
  );
}
