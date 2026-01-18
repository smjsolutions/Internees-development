import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import logo from "../../assets/images/logo.png";

export default function SidebarAdmin({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Appointments", path: "/appointments" },
    { name: "Services", path: "/services-admin" },
    { name: "Packages", path: "/packages-admin" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

    <aside
  className={`
    fixed md:relative z-50
    w-40 lg:w-64
    top-0 bottom-0
    bg-black text-white
    border-r border-white/10
    transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
    flex flex-col
  `}
>


        {/* Logo */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <img src={logo} alt="Logo" className="w-28" />
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="text-white" />
          </button>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center py-6 border-b border-white/10">
          <img
            src="https://i.pravatar.cc/80"
            className="w-16 h-16 rounded-full border border-white/20 mb-2"
            alt="Profile"
          />
          <h4 className="font-semibold">Sarah Smith</h4>
          <span className="text-xs text-gray-400">ADMIN</span>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-4">
          <p className="text-xs text-gray-500 mb-2 uppercase">Main</p>
          <div className="space-y-1">
            {menu.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`block px-4 py-2 rounded-md text-sm font-medium transition
                  ${
                    location.pathname === item.path
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}
