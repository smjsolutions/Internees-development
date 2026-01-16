import { Bell, Search, Menu, RefreshCcw, Download, SlidersHorizontal } from "lucide-react";

export default function Topbar({ setSidebarOpen }) {
  return (
    <header className="bg-black px-4 sm:px-6 py-3 flex items-center justify-between border-b border-white/10 text-white">
      
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6 text-white" />
        </button>

       
      </div>

      {/* CENTER SEARCH (Desktop only) */}
      <div className="relative w-80 hidden md:block">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-2 w-full rounded-md text-sm 
                     bg-gray-900 text-white border border-white/10 
                     focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <SlidersHorizontal className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
        <RefreshCcw className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
        <Download className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
        <Bell className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
        <img
          src="https://i.pravatar.cc/40"
          className="w-8 h-8 rounded-full border border-white/20"
          alt="User"
        />
      </div>
    </header>
  );
}
