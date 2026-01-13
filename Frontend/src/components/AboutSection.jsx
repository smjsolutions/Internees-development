import React from 'react';
import { FaPhoneAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";

// Import images from src/assets/images
import about1 from "../assets/images/about1.webp";
import about2 from "../assets/images/about2.webp";
import about3 from "../assets/images/about3.webp";

export default function AboutSection() {
  return (
    <section className="bg-[#faf8f5] py-28 px-5 md:px-[7%]">
      <div className="grid lg:grid-cols-2 gap-10 items-start">

        {/* LEFT SIDE (Images + Call Box) */}
        <div className="order-2 lg:order-1">
          {/* IMAGE COLLAGE CONTAINER */}
          <div className="relative w-full lg:h-[600px] h-auto flex flex-col lg:flex-none">

            {/* BACK IMAGE */}
            <img
              src={about1}
              alt="Salon"
              className="rounded-lg shadow-lg object-cover w-full h-64 mb-4 lg:absolute lg:top-0 lg:left-0 lg:w-[40%] lg:h-[320px]"
            />

            {/* MIDDLE IMAGE */}
            <img
              src={about2}
              alt="Salon"
              className="rounded-lg shadow-xl object-cover w-full h-64 mb-4 lg:absolute lg:top-[60px] lg:right-0 lg:w-[65%] lg:h-[300px]"
            />

            {/* FRONT IMAGE */}
            <img
              src={about3}
              alt="Salon"
              className="rounded-lg shadow-2xl object-cover w-full h-64 mb-4 lg:absolute lg:top-[180px] lg:left-[6%] lg:w-[55%] lg:h-[400px]"
            />
          </div>

          {/* CALL BOX */}
          <div className="flex items-center bg-[#fdfbf8] mt-4 w-full shadow-md rounded-lg overflow-hidden">
            <div
              className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20"
              style={{ backgroundColor: "rgb(187, 140, 75)" }}
            >
              <FaPhoneAlt className="text-white text-2xl" />
            </div>

            <div className="px-4 py-3 md:px-6 md:py-4">
              <h4 className="text-lg font-medium">0685872060</h4>
              <p className="text-gray-600 text-sm">
                Call us direct 24/7 for get a free consultation
              </p>
            </div>
          </div>
        </div>


        {/* RIGHT CONTENT */}
        <div className="order-1 lg:order-2 flex-1 lg:flex-2">
          {/* Subtitle */}
          <p className="text-lg font-medium mb-4" style={{ color: "rgb(187, 140, 75)" }}>
            About Us
          </p>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-serif leading-tight mb-6 md:mb-8">
            Why People Choose Us!
          </h2>

          {/* Description */}
          <p className="text-gray-600 leading-6 mb-8 md:mb-10 max-w-full md:max-w-xl text-sm sm:text-base">
            From the beginning we set out to be different. When Diamond Trim
            Beauty Studio (DTBS) entered the market in 2025 our vision was
            clear — to create a revolutionary beauty concept that would appeal
            to the thinking men & women.
            <br /><br />
            From our very first salon, our commitment to innovation, people
            development, and social causes remains resolute.
          </p>

          {/* STATS */}
          <div className="grid sm:grid-cols-2 gap-6 md:gap-10 mb-8 md:mb-15">
            <div className="bg-[#fdfbf8] py-10 md:py-14 rounded-xl text-center shadow-sm">
              <FaCalendarAlt
                className="text-4xl md:text-5xl mx-auto mb-4 md:mb-5"
                style={{ color: "rgb(187, 140, 75)" }}
              />
              <h3 className="text-3xl md:text-5xl font-serif mb-2">25</h3>
              <p className="text-xs sm:text-sm tracking-widest text-gray-600 uppercase">
                Years Experience
              </p>
            </div>

            <div className="bg-[#fdfbf8] py-10 md:py-14 rounded-xl text-center shadow-sm">
              <FaUsers
                className="text-4xl md:text-5xl mx-auto mb-4 md:mb-5"
                style={{ color: "rgb(187, 140, 75)" }}
              />
              <h3 className="text-3xl md:text-5xl font-serif mb-2">999</h3>
              <p className="text-xs sm:text-sm tracking-widest text-gray-600 uppercase">
                Happy Customers
              </p>
            </div>
          </div>

          {/* READ MORE BUTTON */}
          <button
            className="
              group
              relative
              px-12 sm:px-16 py-4 sm:py-5
              bg-[#BB8C4B]
              text-black
              text-sm
              tracking-widest
              border
              border-[#D79A4A]
              font-medium
              transition-all
              duration-300
              hover:bg-[#A97C42]
              hover:text-white
            "
          >
            READ MORE
            {/* Decorative corners */}
            <span className="absolute -top-2 -left-2 w-7 h-3 border-t-2 border-l-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
            <span className="absolute -top-2 -right-2 w-7 h-3 border-t-2 border-r-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
            <span className="absolute -bottom-2 -left-2 w-7 h-3 border-b-2 border-l-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
            <span className="absolute -bottom-2 -right-2 w-7 h-3 border-b-2 border-r-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
          </button>
        </div>
      </div>
    </section>
  );
}
