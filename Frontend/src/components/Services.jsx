import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingDrawer from "./BookingDrawer";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";

const Services = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const onClose = () => setIsOpen(false);

  // Fetch services from backend using Axios
 useEffect(() => {
  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/customer/services`
      );

      if (response.data.success) {
        setServices(response.data.data);
      } else {
        console.error("Failed:", response.data.message);
      }
    } catch (error) {
      console.error("Axios error:", error);
    } finally {
      setLoading(false);
    }
  };

    fetchServices();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading services...</p>;

  return (
    <section className="bg-gray-100 py-24 mt-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <h1 className="text-3xl sm:text-4xl font-serif text-black">All Services</h1>
          <p className="text-[#BB8C4B] tracking-widest uppercase mb-3">
            Explore all available services
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="p-8 text-center border rounded-lg shadow hover:shadow-lg transition cursor-pointer bg-white"
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
                  <div className="text-4xl text-[#BB8C4B]">💈</div>
                )}
              </div>

              {/* Service Name */}
              <h3 className="text-xl font-serif">{service.name}</h3>

              {/* Pricing */}
              <div className="mt-4">
                {service.pricing && service.pricing.length > 0 ? (
                  service.pricing.map((price, i) => (
                    <p key={i}>Price: ${price}</p>
                  ))
                ) : (
                  <p>No pricing available</p>
                )}

                {/* BOOK NOW BUTTON */}
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
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
            </div>
          ))}
        </div>
      </div>

      {/* BOOKING DRAWER POPUP */}
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

export default Services;
