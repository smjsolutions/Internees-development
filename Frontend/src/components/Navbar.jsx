import React, { useState, useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const menuItems = [
    "Home",
    "Who we are",
    "Deals/Packages",
    "Services We Offer",
    "Gallery",
    "Contact",
  ];

  return (
    <nav className="w-full border-b border-gray-200 bg-[#222227] z-50 fixed top-0 left-0">
      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto container px-4 sm:px-6 lg:px-12">
        <div className="py-3 sm:py-4 flex items-center justify-between">
          
          {/* LOGO */}
          <img
            src={logo}
            alt="Salone Logo"
            className="h-8 sm:h-10 md:h-12 w-auto object-contain"
          />

          {/* DESKTOP MENU (ONLY LG+) */}
          <ul className="hidden lg:flex flex-1 justify-center items-center gap-4 xl:gap-6 uppercase text-[14px] lg:text-[15px] font-serif text-[#DDDDDD]">
            {menuItems.map((item) => (
              <li
                key={item}
                className="hover:text-[#BB8C4B] cursor-pointer transition"
              >
                {item}
              </li>
            ))}
          </ul>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-3">
            {/* LOGIN ICON */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 cursor-pointer">
              <div className="absolute inset-0 border-2 border-[#BB8C4B] rounded-md" />
              <div
                className="absolute inset-1 border border-[#BB8C4B] rounded-md flex items-center justify-center bg-[#c89b5f] hover:bg-black transition text-white"
                onClick={() => navigate("/login")}
              >
                <IoIosLogIn className="text-xl sm:text-2xl" />
              </div>
            </div>

            {/* HAMBURGER (SHOWS BELOW LG, INCLUDING MD) */}
            <button
              className="lg:hidden text-[#DDDDDD]"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <HiOutlineX className="text-3xl" />
              ) : (
                <HiOutlineMenu className="text-3xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* BACKDROP */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden absolute left-0 w-full bg-[#222227] transform transition-all duration-300 ease-in-out ${
          isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center gap-4 py-6 uppercase text-[14px] font-serif text-[#DDDDDD]">
          {menuItems.map((item) => (
            <li
              key={item}
              onClick={() => setIsOpen(false)}
              className="hover:text-[#BB8C4B] transition cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
