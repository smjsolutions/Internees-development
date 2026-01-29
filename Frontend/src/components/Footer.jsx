import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import logo from "../assets/images/logo.png";

const Footer = () => {
  // Social media links array
  const socialLinks = [
    {
      Icon: FaTwitter,
      url: "https://twitter.com/diamondtrimpk",
      label: "Twitter"
    },
    {
      Icon: FaFacebookF,
      url: "https://www.facebook.com/profile.php?id=61576290514525&rdid=YCrsfchVCdNK5sSu&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AQmQTKD7G%2F#",
      label: "Facebook"
    },
    {
      Icon: FaLinkedinIn,
      url: "https://www.linkedin.com/company/diamondtrimpk",
      label: "LinkedIn"
    },
    {
      Icon: FaInstagram,
      url: "https://www.instagram.com/diamondtrim_beauty_studio?igsh=MWVsdDZzNGc3dHoxOQ%3D%3D",
      label: "Instagram"
    }
  ];

  return (
    <footer className="bg-[#222227] text-[#DDDDDD] pt-10 pb-6 mt-auto ">
      <div className="max-w-7xl container mx-auto px-6 md:px-16 grid md:grid-cols-3 gap-10">

        {/* Left Section: Logo + About + Social Icons */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Salone Logo" className="h-10 w-auto" />
          </div>
          <p className="text-sm mb-4 text-[#DDDDDD]">
           Our Diamond Trim Beauty Studio is the created for men who appreciate premium quality, time and flawless look.
          </p>
          <div className="flex items-center gap-3 mt-2">
            {socialLinks.map(({ Icon, url, label }, idx) => (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-md border-2 border-[#BB8C4B] flex items-center justify-center relative cursor-pointer hover:bg-[#BB8C4B] transition"
              >
                <div className="absolute inset-0.5 rounded-md border-2 border-[#BB8C4B] pointer-events-none"></div>
                <Icon className="relative z-10" />
              </a>
            ))}
          </div>
        </div>

        {/* Center Section: Contact Info */}
        <div>
          <h3 className="text-[#BB8C4B] text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm mb-2 text-[#DDDDDD]"><strong>Address:</strong> Club Road , Near Dessert Palm Hotel, Rahim Yar khan</p>
          <p className="text-sm mb-2 text-[#DDDDDD]"><strong>Phone:</strong> +923406465222</p>
          <p className="text-sm mb-2 text-[#DDDDDD]"><strong>Email:</strong> info@diamondtrimpk.com</p>
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