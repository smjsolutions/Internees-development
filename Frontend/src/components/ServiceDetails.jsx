import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import BookingDrawer from "./BookingDrawer";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const descRef = useRef(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/customer/services/${id}`
        );
        const data = response.data;
        if (data.success && data.data) {
          setService(data.data);
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

  // Check if description exceeds 3 lines
  useEffect(() => {
    if (descRef.current) {
      const lineHeight = parseInt(getComputedStyle(descRef.current).lineHeight, 10);
      const maxHeight = lineHeight * 3;
      if (descRef.current.scrollHeight > maxHeight) {
        setShowReadMore(true);
      }
    }
  }, [service]);

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
    <div className="max-w-7xl container mx-auto pt-[100px] mt-10 mb-10 py-12 px-4 sm:px-6 md:px-8">

      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-12">

        {/* IMAGE SECTION */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full h-[250px] sm:h-[380px] md:h-auto overflow-hidden rounded-2xl">
            {service.images && service.images.length > 0 ? (
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/${service.images[0].replace(/\\/g, "/")}`}
                alt={service.name}
                className="w-full md:h-[470px] md:object-contain  object-cover rounded-2xl"
              />
            ) : (
              <div className="text-8xl text-[#BB8C4B] animate-bounce w-full h-full flex items-center justify-center">
                💈
              </div>
            )}
          </div>
        </div>

        {/* TEXT SECTION */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-4 sm:space-y-6">
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl  font-extrabold text-gray-900">
            {service.name}
          </h1>

          {service.category && (
            <span className="mt-2 inline-block bg-[#BB8C4B] text-white text-sm sm:text-base font-medium px-3 py-1 rounded-full uppercase tracking-wide">
              {service.category}
            </span>
          )}

          {/* DESCRIPTION WITH READ MORE */}
          <div className="mt-4 text-gray-700 text-base sm:text-lg md:text-lg leading-relaxed">
            <p
              ref={descRef}
              className={`transition-all duration-300 ${
                !showFullDescription ? "line-clamp-3 overflow-hidden" : ""
              }`}
            >
              {service.description}
            </p>

            {showReadMore && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-2 text-[#BB8C4B] font-semibold hover:underline"
              >
                {showFullDescription ? "Read Less" : "Read More"}
              </button>
            )}
          </div>

          {/* DURATION & PRICE */}
          <div className="flex flex-col items-center sm:flex-row sm:items-center gap-6 mt-4 sm:mt-6 justify-center md:justify-start w-full">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">Duration:</span>
              <span className="text-gray-600">{service.duration}</span>
            </div>

            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <span className="font-semibold text-gray-800">Price:</span>
              <span className="text-gray-600">
                ${service.pricing && service.pricing.length > 0
                  ? Number(service.pricing[0]).toLocaleString("en-IN")
                  : 0}
              </span>
            </div>
          </div>

          {/* BOOK NOW BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base tracking-widest text-black border border-[#D79A4A] transition-all duration-300 hover:bg-[#BB8C4B] hover:text-white flex items-center justify-center gap-2 mt-6"
          >
            Book Now <FaArrowRight className="inline-block text-sm sm:text-base" />
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
          service={service.name}
          price={service.pricing && service.pricing.length > 0 ? service.pricing[0] : 0}
        />
      )}
    </div>
  );
};

export default ServiceDetails;
