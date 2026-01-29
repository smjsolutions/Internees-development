import React from "react";
import Sidebar from "../../components/admin/SidebarAdmin";
import Topbar from "../../components/admin/TopbarAdmin";
import AddGalleryImage from "../../components/admin/AddGalleryImage";

export default function Addgalleryimage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        <Topbar />
        <div className="p-6">
          <AddGalleryImage />
        </div>
      </main>
    </div>
  );
}
