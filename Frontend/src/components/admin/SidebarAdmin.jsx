import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import logo from "../../assets/images/logo.png";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function SidebarAdmin({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const [openGallery, setOpenGallery] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Appointments", path: "/appointments" },
    { name: "Services", path: "/services-admin" },
    { name: "Packages", path: "/packages-admin" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:relative top-0 left-0 bottom-0 z-50
          w-64
          bg-black text-white border-r border-white/10
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          flex flex-col
        `}
      >
        {/* Logo */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <img src={logo} alt="Logo" className="w-32 object-contain" />
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="text-white" />
          </button>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center py-6 border-b border-white/10">
          <img
            src="https://i.pravatar.cc/80"
            alt="Profile"
            className="w-16 h-16 rounded-full border border-white/20 mb-2"
          />
          <h4 className="font-semibold">Sarah Smith</h4>
          <span className="text-xs text-gray-400">ADMIN</span>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`block px-4 py-2 rounded-md text-sm font-medium transition
                ${
                  location.pathname === item.path
                    ? "bg-[#BB8C4B]"
                    : "hover:bg-white/10"
                }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Gallery Dropdown */}
          <div>
            <button
              onClick={() => setOpenGallery(!openGallery)}
              className="w-full flex justify-between items-center px-4 py-2 rounded-md hover:bg-white/10 text-sm font-medium mt-2"
            >
              <span>Gallery</span>
              {openGallery ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {openGallery && (
              <div className="ml-4 mt-2 space-y-1">
                <Link
                  to="/gallery-admin"
                  className={`block px-4 py-2 text-sm rounded-md ${
                    location.pathname === "/gallery-admin"
                      ? "bg-[#BB8C4B]"
                      : "hover:bg-white/10"
                  }`}
                >
                  All Images
                </Link>

                <Link
                  to="/gallery-admin/add"
                  className={`block px-4 py-2 text-sm rounded-md ${
                    location.pathname === "/gallery-admin/add"
                      ? "bg-[#BB8C4B]"
                      : "hover:bg-white/10"
                  }`}
                >
                  Add New Image
                </Link>
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}
