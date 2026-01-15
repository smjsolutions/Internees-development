import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
const testimonials = [
  {
    text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
    name: "Client Name",
    profession: "Profession",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    highlighted: false,
  },
  {
    text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
    name: "Client Name",
    profession: "Profession",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    highlighted: true,
  },
  {
    text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
    name: "Client Name",
    profession: "Profession",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    highlighted: false,
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-10 bg-white container max-w-7xl px-4 sm:px-6 lg:px-12 mx-auto mt-10 ">
            <div className="text-center">
            <h2 className="text-white bg-[#BB8C4B] mb-2
                 text-base md:text-lg
                 border rounded-md inline-block
                 tracking-widest uppercase px-4 py-1">
              Testimonial
            </h2>
            <h2 className="text-black text-center mb-4
               text-xl sm:text-2xl md:text-3xl lg:text-4xl 
               font-serif">
             What our Client Says
            </h2>
            </div>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className={`relative p-10 text-center rounded-sm overflow-hidden
              ${
                item.highlighted
                  ? "bg-[#BB8C4B] text-black"
                  : "bg-[#f6f5f2] text-gray-700"
              }`}
          >
            {/* Large Quote Background */}
           <span className="absolute inset-0 flex items-center justify-center text-[400px] opacity-10 pointer-events-none">
          <FaQuoteLeft />
            </span>


            {/* Quote Icon */}
            <div className="relative text-5xl font-bold mb-6">“”</div>

            {/* Text */}
            <p className="relative mb-8 text-lg leading-relaxed">
              {item.text}
            </p>

            {/* Avatar */}
            <div className="relative flex justify-center mb-4">
              <div className="p-1 border-4 border-white">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover"
                />
              </div>
            </div>

            {/* Name */}
            <h3 className="relative text-2xl font-serif">
              {item.name}
            </h3>

            {/* Profession */}
            <p className="relative  tracking-widest text-base mt-1">
              {item.profession}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
