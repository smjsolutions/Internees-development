import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingDrawer from "./BookingDrawer";
import { FaArrowRight, FaEye } from "react-icons/fa";
import axios from "axios";

const ServicesSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const onClose = () => setIsOpen(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/customer/services`
        );
        if (response.data.success) {
          setServices(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading services...</p>;

  return (
    <section className="bg-white py-24 mt-10">
      <div className="max-w-7xl mx-auto container px-4 sm:px-6 lg:px-12">

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
          {services.slice(0, 6).map((service) => (
            <div
              key={service._id}
              className="relative group py-12 px-6 text-center border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Image container */}
              <div className="relative mx-auto mb-4 w-64 h-48 sm:w-72 sm:h-52 rounded-lg overflow-hidden">
                {service.images && service.images.length > 0 ? (
                  <img
                    src={`http://localhost:5000/${service.images[0].replace(/\\/g, "/")}`}
                    alt={service.name}
                    className="w-full h-full object-cover rounded-lg transition-all duration-300 
                    group-hover:scale-105 group-hover:blur-[5px]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-6xl text-[#BB8C4B] rounded-lg">
                    💈
                  </div>
                )}

                {/* Eye icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 
                group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/servicedetail/${service._id}`);
                    }}
                    className="pointer-events-auto bg-[#BB8C4B] rounded-full p-2 shadow-lg cursor-pointer 
                    hover:scale-110 transition-transform duration-200"
                  >
                    <FaEye className="text-white text-2xl sm:text-3xl" />
                  </div>
                </div>
              </div>

              {/* Service Name */}
              <h3 className="text-lg font-semibold mb-2">{service.name}</h3>

              {/* Pricing */}
              {service.pricing && (
                <p className="text-gray-800 mb-4 text-lg font-semibold">
                  Price: {service.pricing}
                </p>
              )}

              {/* Book Now Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedService(service);
                  setIsOpen(true);
                }}
                className="group px-8 py-3 text-xs sm:text-sm tracking-widest text-black border border-[#D79A4A]
                transition-all duration-300 hover:bg-[#BB8C4B] hover:text-white flex items-center justify-center gap-2 mx-auto"
              >
                Book Now
                <FaArrowRight className="inline-block text-xs sm:text-sm" />
              </button>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/services")}
            className="px-12 py-4 bg-[#BB8C4B] text-black text-sm tracking-widest border border-[#D79A4A]
            transition-all duration-300 hover:bg-[#A97C42] hover:text-white"
          >
            VIEW ALL SERVICES
          </button>
        </div>
      </div>

      {/* Booking Drawer Popup */}
      {selectedService && (
        <BookingDrawer
          isOpen={isOpen}
          onClose={onClose}
          service={selectedService.name}
          price={selectedService.pricing || "0"}
        />
      )}
    </section>
  );
};

export default ServicesSection;
