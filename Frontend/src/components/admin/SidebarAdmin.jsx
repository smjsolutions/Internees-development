import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export default function Sidebar() {
  const location = useLocation(); // To highlight active menu

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Services", path: "/services-admin" },
  ];

  return (
    <aside className="w-64 bg-[#0f172a] text-white hidden md:flex flex-col">
      {/* Logo */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-center">
        <img src={logo} alt="V-Dashboard Logo" className="w-42 object-contain" />
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`w-full block text-left px-4 py-2 rounded-md text-sm ${
              location.pathname === item.path ? "bg-[#BB8C4B]" : "hover:bg-white/10"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
