import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookingDrawer from "./BookingDrawer";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/services/${id}`);
        const data = response.data;
        if (data.success || data._id) {
          setService(data.data || data);
        } else {
          console.error("Service not found");
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg animate-pulse">
        Loading service details...
      </p>
    );

  if (!service)
    return (
      <div className="flex justify-center items-center h-96">
        <h2 className="text-xl text-gray-500">Service not found</h2>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 md:py-12 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

        {/* IMAGE SECTION */}
        <div className="w-full flex items-center justify-center">
          {service.images && service.images.length > 0 ? (
            <img
              src={`http://localhost:5000/${service.images[0].replace(/\\/g, "/")}`}
              alt={service.name || service.title}
              className="w-full max-w-md sm:max-w-lg md:max-w-full h-auto rounded-2xl object-cover transform transition duration-500 hover:scale-105"
            />
          ) : (
            <div className="text-8xl text-[#BB8C4B] animate-bounce">💈</div>
          )}
        </div>

        {/* TEXT SECTION */}
        <div className="flex flex-col  justify-center space-y-4 sm:space-y-6 ">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
            {service.name || service.title}
          </h1>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg md:text-lg">
            {service.description}
          </p>

          {/* Parallel Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 md:gap-10 mt-4 sm:mt-6">
            {/* Duration */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">Duration:</span>
              <span className="text-gray-600">{service.duration}</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <span className="font-semibold text-gray-800">Price:</span>
              <span className="text-gray-600">
                ₹{service.pricing && service.pricing.length > 0
                  ? Number(service.pricing[0]).toLocaleString("en-IN")
                  : 0}
              </span>
            </div>
          </div>

          {/* Book Now Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base tracking-widest text-black border border-[#D79A4A] transition-all duration-300 hover:bg-[#BB8C4B] hover:text-white flex items-center justify-center gap-2 mt-4"
          >
            Book Now <FaArrowRight className="inline-block text-sm sm:text-base" />

            {/* Animated corner borders */}
            <span className="absolute -top-2 -left-2 w-6 h-2 border-t border-l border-[#D79A4A] group-hover:w-8 transition-all duration-300" />
            <span className="absolute -top-2 -right-2 w-6 h-2 border-t border-r border-[#D79A4A] group-hover:w-8 transition-all duration-300" />
            <span className="absolute -bottom-2 -left-2 w-6 h-2 border-b border-l border-[#D79A4A] group-hover:w-8 transition-all duration-300" />
            <span className="absolute -bottom-2 -right-2 w-6 h-2 border-b border-r border-[#D79A4A] group-hover:w-8 transition-all duration-300" />
          </button>
        </div>
      </div>

      {/* Booking Drawer */}
      {service && (
        <BookingDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          service={service.name || service.title}
          price={service.pricing && service.pricing.length > 0 ? service.pricing[0] : 0}
        />
      )}
    </div>
  );
};

export default ServiceDetails;
