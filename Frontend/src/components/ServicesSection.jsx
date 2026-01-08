import React from 'react';
import { useState } from "react";
import BookingDrawer from "./BookingDrawer";

import {
  FaCut,        // haircut
  FaUserAlt,  
  FaArrowRight,    // long cut
} from "react-icons/fa";

import {
  GiRazor,      // beard shave
  GiBeard, 
  GiHairStrands,    
} from "react-icons/gi";


import { MdOutlineContentCut } from "react-icons/md"; // shave

export default function ServicesSection() {
   const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const onClose = () => {
    setIsOpen(false);
  };

const services = [
  { title: "Simple Haircut Men", price: 800, icon: FaCut },
  { title: "Fade Haircut", price: 1200, icon: FaUserAlt },
  { title: "Long Cut", price: 1500, icon: GiHairStrands },
  { title: "Beard Shave", price: 500, icon: GiRazor },
  { title: "Beard Trim", price: 700, icon: GiBeard },
  { title: "Shave", price: 400, icon: MdOutlineContentCut },
];

  return (
    <section className="bg-white py-24 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-[#BB8C4B] tracking-widest uppercase mb-3 text-sm sm:text-base">
            Our Services
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-black">
            Explore Our Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="py-12 px-6 text-center border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Icon */}
                <Icon className="mx-auto text-4xl text-[#BB8C4B] mb-6" />

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-serif text-black mb-4">
                  {service.title}
                </h3>

             


{/* Read More Button */}
<div className="flex justify-center">
  <button
  onClick={() => {
  setSelectedService(service);
  setIsOpen(true);
}}

    className="
      group
      relative
      px-8 sm:px-10
      py-3
      text-xs sm:text-sm
      tracking-widest
      text-black
      border
      border-[#D79A4A]
      transition-all
      duration-300
      hover:bg-[#BB8C4B]
      hover:text-white
      flex items-center justify-center gap-2
    "
  >
    Book Now <FaArrowRight className="inline-block text-xs sm:text-sm" />
    
    {/* Decorative corners */}
    <span className="absolute -top-2 -left-2 w-7 h-3 border-t border-l border-[#D79A4A] group-hover:w-10 transition-all duration-300" />
    <span className="absolute -top-2 -right-2 w-7 h-3 border-t border-r border-[#D79A4A] group-hover:w-10 transition-all duration-300" />
    <span className="absolute -bottom-2 -left-2 w-7 h-3 border-b border-l border-[#D79A4A] group-hover:w-10 transition-all duration-300" />
    <span className="absolute -bottom-2 -right-2 w-7 h-3 border-b border-r border-[#D79A4A] group-hover:w-10 transition-all duration-300" />
  </button>
</div>


              </div>
            );
          })}
        </div>

        {/* See All Services Button */}
        <div className="mt-12 text-center">
        {/* SEE ALL SERVICES BUTTON */}
<div className="mt-12 text-center">
  <button
    className="
      group
      relative
      px-12 sm:px-16
      py-4 sm:py-5
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
    SEE ALL SERVICES
    {/* Decorative corners */}
    <span className="absolute -top-2 -left-2 w-7 h-3 border-t-2 border-l-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
    <span className="absolute -top-2 -right-2 w-7 h-3 border-t-2 border-r-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
    <span className="absolute -bottom-2 -left-2 w-7 h-3 border-b-2 border-l-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
    <span className="absolute -bottom-2 -right-2 w-7 h-3 border-b-2 border-r-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
  </button>
</div>

        </div>
      </div>
 {selectedService && (
  <BookingDrawer
    isOpen={isOpen}
    onClose={onClose}
    service={selectedService.title}
    price={selectedService.price}
  />
)}



    </section>
  );
}
