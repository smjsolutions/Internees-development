import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingDrawer from "./BookingDrawer";

import { FaCut, FaUserAlt, FaArrowRight } from "react-icons/fa";
import { GiRazor, GiBeard, GiHairStrands } from "react-icons/gi";
import { MdOutlineContentCut } from "react-icons/md";

const ServicesSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate(); // For navigation

  const onClose = () => setIsOpen(false);

  // Services data
  const services = [
    {
      title: "Simple Haircut Men",
      category: "Hair",
      description: "Basic haircut for men",
      duration: "30 min",
      price: 800,
      pricing: [{ title: "Standard", price: 800 }],
      images: [],
      icon: FaCut,
    },
    {
      title: "Fade Haircut",
      category: "Hair",
      description: "Stylish fade haircut",
      duration: "45 min",
      price: 1200,
      pricing: [
        { title: "Standard", price: 1200 },
        { title: "Premium", price: 1500 },
      ],
      images: [],
      icon: FaUserAlt,
    },
    {
      title: "Long Cut",
      category: "Hair",
      description: "Haircut for long hair",
      duration: "60 min",
      price: 1500,
      pricing: [
        { title: "Standard", price: 1500 },
        { title: "Premium", price: 1800 },
      ],
      images: [],
      icon: GiHairStrands,
    },
    {
      title: "Beard Shave",
      category: "Beard",
      description: "Smooth beard shave",
      duration: "20 min",
      price: 500,
      pricing: [{ title: "Standard", price: 500 }],
      images: [],
      icon: GiRazor,
    },
    {
      title: "Beard Trim",
      category: "Beard",
      description: "Neat beard trimming",
      duration: "25 min",
      price: 700,
      pricing: [{ title: "Standard", price: 700 }],
      images: [],
      icon: GiBeard,
    },
    {
      title: "Shave",
      category: "Beard",
      description: "Clean shave",
      duration: "15 min",
      price: 400,
      pricing: [{ title: "Standard", price: 400 }],
      images: [],
      icon: MdOutlineContentCut,
    },
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
                className="py-12 px-6 text-center border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate("/service-detail", { state: { service } })}
              >
                <Icon className="mx-auto text-4xl text-[#BB8C4B] mb-6" />
                <h3 className="text-xl sm:text-2xl font-serif text-black mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{service.category}</p>
                <p className="text-sm text-gray-500 mb-2">
                  Duration: {service.duration}
                </p>
                <p className="text-gray-700 mb-4">{service.description}</p>

                {/* Pricing */}
                {service.pricing.length > 0 && (
                  <div className="mb-4">
                    {service.pricing.map((p, idx) => (
                      <p key={idx} className="text-gray-800 text-sm">
                        {p.title}: ₹{p.price}
                      </p>
                    ))}
                  </div>
                )}

                {/* Images */}
                {service.images.length > 0 && (
                  <div className="flex justify-center gap-2 mb-4">
                    {service.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={service.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                )}

                {/* Book Now Button */}
                <div className="flex justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent onClick
                      setSelectedService(service);
                      setIsOpen(true);
                    }}
                    className="group relative px-8 sm:px-10 py-3 text-xs sm:text-sm tracking-widest text-black border border-[#D79A4A] transition-all duration-300 hover:bg-[#BB8C4B] hover:text-white flex items-center justify-center gap-2"
                  >
                    Book Now <FaArrowRight className="inline-block text-xs sm:text-sm" />
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
          <button
            onClick={() => navigate("/services")}
            className="group relative px-12 sm:px-16 py-4 sm:py-5 bg-[#BB8C4B] text-black text-sm tracking-widest border border-[#D79A4A] font-medium transition-all duration-300 hover:bg-[#A97C42] hover:text-white"
          >
            SEE ALL SERVICES
            <span className="absolute -top-2 -left-2 w-7 h-3 border-t-2 border-l-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
            <span className="absolute -top-2 -right-2 w-7 h-3 border-t-2 border-r-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
            <span className="absolute -bottom-2 -left-2 w-7 h-3 border-b-2 border-l-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
            <span className="absolute -bottom-2 -right-2 w-7 h-3 border-b-2 border-r-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
          </button>
        </div>
      </div>

      {/* Booking Drawer */}
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
};

export default ServicesSection;
