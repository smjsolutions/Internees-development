import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#222227] text-[#DDDDDD] pt-10 pb-6">
      <div className="max-w-7xl container mx-auto px-6 md:px-16 grid md:grid-cols-3 gap-10">

        {/* Left Section: Logo + About + Social Icons */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Salone Logo" className="h-10 w-auto" />
          </div>
          <p className="text-sm mb-4 text-[#DDDDDD]">
            Aliquyam sed elitr elitr erat sed diam ipsum eirmod eos lorem nonumy. 
            Tempor sea ipsum diam sed clita dolore eos dolores magna erat dolore sed stet justo et dolor.
          </p>
          <div className="flex items-center gap-3 mt-2">
            {/* Twitter */}
            <div className="w-10 h-10 rounded-md border-2 border-[#BB8C4B] flex items-center justify-center relative cursor-pointer hover:bg-[#BB8C4B] transition">
              <div className="absolute inset-0.5 rounded-md border-2 border-[#BB8C4B] pointer-events-none"></div>
              <FaTwitter className="relative z-10" />
            </div>

            {/* Facebook */}
            <div className="w-10 h-10 rounded-md border-2 border-[#BB8C4B] flex items-center justify-center relative cursor-pointer hover:bg-[#BB8C4B] transition">
              <div className="absolute inset-0.5 rounded-md border-2 border-[#BB8C4B] pointer-events-none"></div>
              <FaFacebookF className="relative z-10" />
            </div>

            {/* LinkedIn */}
            <div className="w-10 h-10 rounded-md border-2 border-[#BB8C4B] flex items-center justify-center relative cursor-pointer hover:bg-[#BB8C4B] transition">
              <div className="absolute inset-0.5 rounded-md border-2 border-[#BB8C4B] pointer-events-none"></div>
              <FaLinkedinIn className="relative z-10" />
            </div>

            {/* Instagram */}
            <div className="w-10 h-10 rounded-md border-2 border-[#BB8C4B] flex items-center justify-center relative cursor-pointer hover:bg-[#BB8C4B] transition">
              <div className="absolute inset-0.5 rounded-md border-2 border-[#BB8C4B] pointer-events-none"></div>
              <FaInstagram className="relative z-10" />
            </div>
          </div>
        </div>

        {/* Center Section: Contact Info */}
        <div>
          <h3 className="text-[#BB8C4B] text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm mb-2 text-[#DDDDDD]"><strong>Address:</strong> 123 Street, New York, USA</p>
          <p className="text-sm mb-2 text-[#DDDDDD]"><strong>Phone:</strong> +012 345 67890</p>
          <p className="text-sm mb-2 text-[#DDDDDD]"><strong>Email:</strong> info@salone.com</p>
        </div>

        {/* Right Section: Opening Hours */}
        <div>
          <h3 className="text-[#BB8C4B] text-lg font-semibold mb-4">Opening Hours</h3>
          <p className="text-sm mb-2 text-[#DDDDDD]">Monday - Friday: 09:00 am - 10:00 pm</p>
          <p className="text-sm mb-2 text-[#DDDDDD]">Saturday: 10:00 am - 10:00 pm</p>
          <p className="text-sm mb-2 text-[#DDDDDD]">Sunday: Closed</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-700 pt-4 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 text-sm">
        <p>© 2026 Diamond Trim Beauty Studio Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
