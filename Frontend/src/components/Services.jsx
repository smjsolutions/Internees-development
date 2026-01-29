import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingDrawer from "./BookingDrawer";
import { FaArrowRight, FaEye } from "react-icons/fa";
import axios from "axios";

const Services = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const onClose = () => setIsOpen(false);

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
              className="relative p-8 text-center border rounded-lg shadow hover:shadow-lg transition bg-white"
            >
              {/* Image container */}
              <div className="relative mx-auto mb-4 w-64 h-48 sm:w-72 sm:h-52 rounded-lg overflow-hidden group">
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
              <h3 className="text-xl font-serif mb-2">{service.name}</h3>

              {/* Pricing */}
              <div className="mt-4">
                {service.pricing ? (
                  <p>Price: {service.pricing}</p>
                ) : (
                  <p>No pricing available</p>
                )}
              </div>

              {/* Book Now Button */}
              <div className="mt-4 flex justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedService(service);
                    setIsOpen(true);
                  }}
                  className="group relative px-8 sm:px-10 py-3 text-xs sm:text-sm tracking-widest text-black 
                  border border-[#D79A4A] transition-all duration-300 hover:bg-[#BB8C4B] hover:text-white 
                  flex items-center justify-center gap-2"
                >
                  Book Now <FaArrowRight className="inline-block text-xs sm:text-sm" />
                </button>
              </div>
            </div>
          ))}
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

export default Services;
