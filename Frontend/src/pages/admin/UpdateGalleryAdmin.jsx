import React from 'react'

import Sidebar from "../../components/admin/SidebarAdmin";
import Topbar from "../../components/admin/TopbarAdmin";

import GalleryEditAdmin from '../../components/admin/GalleryEditAdmin';


export default function UpdateGalleryAdmin() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        <Topbar />
        <div className="p-6">
          <GalleryEditAdmin/>
        </div>
      </main>
    </div>
  );
}
