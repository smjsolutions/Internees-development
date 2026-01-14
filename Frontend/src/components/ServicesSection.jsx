import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingDrawer from "./BookingDrawer";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

const ServicesSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const onClose = () => setIsOpen(false);

  // Fetch services from backend
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
    <section className="bg-white py-24 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto container" >
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
          {services.map((service) => (
            <div
              key={service._id}
              className="py-12 px-6 text-center border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate(`/servicedetail/${service._id}`)}
            >
              {/* Image */}
              <div className="mx-auto mb-4">
                {service.images && service.images.length > 0 ? (
                  <img
                    src={`http://localhost:5000/${service.images[0].replace(/\\/g, "/")}`}
                    alt={service.name}
                    className="w-52 h-35 object-cover mx-auto rounded-lg"
                  />
                ) : (
                  <div className="w-32 h-32 flex items-center justify-center bg-gray-100 text-6xl text-[#BB8C4B] rounded-lg mx-auto">
                    💈
                  </div>
                )}
              </div>

              {/* Price */}
              {service.pricing && service.pricing.length > 0 && (
                <p className="text-gray-800 mb-4 text-lg font-semibold">
                  Price: ₹{service.pricing[0]}
                </p>
              )}

              {/* Book Now Button */}
              <div className="flex justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedService(service);
                    setIsOpen(true);
                  }}
                  className="group relative px-8 sm:px-10 py-3 text-xs sm:text-sm tracking-widest text-black border border-[#D79A4A] transition-all duration-300 hover:bg-[#BB8C4B] hover:text-white flex items-center justify-center gap-2"
                >
                  Book Now <FaArrowRight className="inline-block text-xs sm:text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/services")}
            className="group relative px-12 sm:px-16 py-4 sm:py-5 bg-[#BB8C4B] text-black text-sm tracking-widest border border-[#D79A4A] font-medium transition-all duration-300 hover:bg-[#A97C42] hover:text-white"
          >
            VIEW ALL SERVICES
          </button>
        </div>
      </div>

      {/* Booking Drawer */}
      {selectedService && (
        <BookingDrawer
          isOpen={isOpen}
          onClose={onClose}
          service={selectedService.name}
          price={selectedService.pricing?.[0] || 0}
        />
      )}
    </section>
  );
};

export default ServicesSection;
