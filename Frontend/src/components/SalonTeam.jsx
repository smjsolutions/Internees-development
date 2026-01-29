import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import team1 from "../assets/images/team1.webp";
import team2 from "../assets/images/team2.webp";
import team3 from "../assets/images/team3.webp";
import team4 from "../assets/images/team4.webp";

const teamMembers = [
  {
    name: "Mussyab Khan",
    role: "Hair Specialist",
    image: team1,
  },
  {
    name: "Basit",
    role: "Nail Designer",
    image: team2,
  },
  {
    name: "Jawwad",
    role: "Beauty Specialist",
    image: team3,
  },
  {
    name: "Waris Kotwal",
    role: "Spa Specialist",
    image: team4,
  },
];

export default function TeamSection() {
  return (
    <section className="bg-white px-4 sm:px-6 lg:px-12 container max-w-7xl mx-auto py-20">
      {/* Heading */}
      <h3 className="bg-[#BB8C4B] text-white text-center py-2 px-8 rounded-md mx-auto w-fit mb-4">
        Diamond Trim
      </h3>
      <h2 className="text-3xl font-serif text-center mb-16">
        Our Experienced Specialists
      </h2>

      {/* Decorative background bar */}
      <div className="relative">
        <div className="absolute inset-x-0 top-1/2 h-32 bg-[#BB8C4B] -translate-y-1/2 z-0" />

        {/* Cards */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="relative overflow-hidden group">
              {/* Image */}
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-105 object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/70 backdrop-blur-sm px-6 py-8 text-center w-[85%] transition-all duration-300 group-hover:bg-white mt-40">
                  <p className="text-base tracking-widest text-[#BB8C4B] mb-2">
                    {member.role}
                  </p>
                  <h3 className="text-2xl font-serif mb-6">{member.name}</h3>

                  {/* Social Icons */}
                  <div className="flex justify-center gap-3">
                    <IconBox icon={<FaFacebookF />} />
                    <IconBox icon={<FaInstagram />} />
                    <IconBox icon={<FaLinkedinIn />} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Icon Box Component */
function IconBox({ icon }) {
  return (
    <div className="w-12 h-12 border rounded-md border-black flex items-center justify-center cursor-pointer hover:bg-white bg-[#BB8C4B] hover:text-black transition">
      {icon}
    </div>
  );
}