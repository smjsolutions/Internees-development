import React from 'react'

import Sidebar from "../../components/admin/SidebarAdmin";
import Topbar from "../../components/admin/TopbarAdmin";
import GalleryListAdmin from "../../components/admin/GalleryListAdmin";


export default function Addgalleryimage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        <Topbar />
        <div className="p-6">
          <GalleryListAdmin />
        </div>
      </main>
    </div>
  );
}
