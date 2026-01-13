import React, { useState } from "react";
import { FiPhone, FiMail } from "react-icons/fi";

import hero1 from "../assets/images/hero1.jpg";
import hero2 from "../assets/images/hero2.jpg";
import hero3 from "../assets/images/hero3.jpg";
import bgImg from "../assets/images/hero-bg.jpeg";

/* Fancy Button with double border */
const FancyButton = ({ icon, title, subtitle }) => (
  <div className="flex items-center gap-3 relative">
    <div className="relative w-12 h-12 flex items-center justify-center text-[black]">
      {/* Outer border */}
      <div className="absolute inset-0 border-2 border-[#BB8C4B]  " />
      {/* Inner border */}
      <div className="absolute inset-1 border border-[#BB8C4B] bg-[#BB8C4B] " />
      {/* Icon */}
      <div className="relative text-xl">{icon}</div>
    </div>

    <div>
      <p className="text-[#BB8C4B] font-semibold">{title}</p>
      <p className="text-gray-800">{subtitle}</p>
    </div>
  </div>
);

const Hero = () => {
  const images = [hero1, hero2, hero3];
  const [current, setCurrent] = useState(0);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgba(221,221,221,0.4)] z-0" />

      {/* Container */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-center min-h-[60vh] lg:min-h-[80vh] px-6 lg:px-16 text-center lg:text-left gap-8">
        
        {/* LEFT CONTENT */}
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-[#BB8C4B] italic text-2xl sm:text-2xl md:text-3xl block mb-3">
            Welcome
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-5xl lg:text-6xl mb-6 leading-snug">
            Beauty Salon <br />
            Fashion for <br />
            Women
          </h1>

          <div className="flex flex-col sm:flex-row gap-6 mt-8 justify-center lg:justify-start">
            <FancyButton icon={<FiPhone />} title="Call Us" subtitle="+123456789" />
            <FancyButton icon={<FiMail />} title="Mail Us" subtitle="info@domain.com" />
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full h-64 sm:h-80 md:h-[28rem] lg:max-h-[80vh] lg:flex-[1.3] relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 hover:scale-105 transition-transform duration-500">
          <img
            src={images[current]}
            alt="Salon"
            className="w-full h-full object-cover"
          />

          {/* Slider Buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={() =>
                setCurrent(current === 0 ? images.length - 1 : current - 1)
              }
              className="px-4 py-3 bg-[#c59b5f] text-white border-2 border-white rounded-lg shadow-md"
            >
              ←
            </button>
            <button
              onClick={() =>
                setCurrent(current === images.length - 1 ? 0 : current + 1)
              }
              className="px-4 py-3 bg-[#c59b5f] text-white border-2 border-white rounded-lg shadow-md"
            >
              →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
