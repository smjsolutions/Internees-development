import React from "react";
import { Scissors, Users, Award, Clock, Sparkles, Heart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  const teamMembers = [
    {
      name: "Mussyab Khan",
      role: "Master Stylist",
      image: "team1.webp",
    },
    {
      name: "Basit",
      role: "Senior Barber",
      image: "team2.webp",
    },
    {
      name: "Jawwad",
      role: "Hair Specialist",
      image: "team3.webp",
    },
    {
      name: "Waris Kotwal",
      role: "Grooming Expert",
      image: "team4.webp",
    },
  ];

  const highlights = [
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "Expert Craftsmanship",
      description:
        "Every member of our team is competent and highly qualified in their field.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Client-Centered",
      description:
        "Attentive, dedicated and helpful service making your stay as enjoyable as possible.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Premium Quality",
      description:
        "We provide the highest levels of professional services for you to love and celebrate yourself.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Hygiene First",
      description:
        "Clean and healthy salon environment is our top priority, complying with international guidelines.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Navbar />

      {/* Hero Section with Pexels Background Image */}
      <div className="relative overflow-hidden pt-20">
        {/* Background Image from Pexels - Professional Barbershop */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          }}
        >
          {/* Dark Overlay with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#222227]/95 via-[#222227]/90 to-[#BB8C4B]/85"></div>
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center space-y-6">
            <div className="inline-block animate-fade-in">
              <span className="px-4 py-2 bg-[#BB8C4B]/20 border border-[#BB8C4B]/30 rounded-full text-[#D79A4A] text-sm font-medium tracking-wider backdrop-blur-sm">
                ABOUT US
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-white animate-fade-in-up">
              Diamond Trim
              <span className="block text-[#BB8C4B] mt-2">Beauty Studio</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay">
              Where excellence meets innovation in men's grooming
            </p>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="relative">
          <svg
            className="w-full h-16 fill-current text-[#faf8f5]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-[#BB8C4B]"></div>
              <span className="text-[#BB8C4B] font-semibold tracking-wider uppercase text-sm">
                We are the best
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#222227] leading-tight">
              Diamond Trim
              <span className="block text-[#BB8C4B]">Beauty Studio</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>
                From the beginning we set out to be different. When Diamond Trim
                Beauty Studio (DTBS) entered the market in 2025 our vision was
                clear: to create a revolutionary beauty concept that would appeal
                to the thinking men & woman.
              </p>
              <p>
                From our first Salon that we have opened, our commitment to
                innovation, people development and social causes remains
                resolute.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img
                src="https://diamondtrimpk.com/website-front-end/img/abt3.webp"
                alt="Diamond Trim Studio"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500">
              <img
                src="https://diamondtrimpk.com/website-front-end/img/abt2.webp"
                alt="Salon Interior"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500">
              <img
                src="https://diamondtrimpk.com/website-front-end/img/abt1.webp"
                alt="Premium Services"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Success Story Section */}
        <div className="bg-gradient-to-br from-[#222227] to-[#BB8C4B] rounded-3xl p-8 md:p-16 mb-24 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#BB8C4B]/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-800/30 rounded-full -ml-48 -mb-48"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Our Story is One of Success
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-200 leading-relaxed">
              <p>
                We focus on best service, good conversations and long-term
                relationships. A clean and healthy salon environment is our top
                priority. We strictly comply with all local laws and
                international hygiene guidelines.
              </p>
              <p>
                Every member of our team is competent and highly qualified in
                their field. Each member of our staff is trained to be
                attentive, dedicated and helpful, making your stay with us as
                enjoyable as possible.
              </p>
            </div>
            <p className="mt-6 text-[#D79A4A] text-lg font-medium">
              Our beauty salon provides you with the highest levels of
              professional services for you to love and celebrate yourself even
              more...!
            </p>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#222227] text-center mb-12">
            Why Choose <span className="text-[#BB8C4B]">Diamond Trim</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="group bg-[#fdfbf8] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                  style={{ backgroundColor: '#BB8C4B' }}
                >
                  {highlight.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-[#222227] mb-3">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-1 w-12 bg-[#BB8C4B]"></div>
              <span className="text-[#BB8C4B] font-semibold tracking-wider uppercase text-sm">
                Best Salon
              </span>
              <div className="h-1 w-12 bg-[#BB8C4B]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#222227]">
              Meet Our <span className="text-[#BB8C4B]">Team</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
              >
                <div className="aspect-[3/4] overflow-hidden bg-gray-200">
                  <img
                    src={`https://diamondtrimpk.com/website-front-end/img/${member.image}`}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#222227] via-[#222227]/95 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#BB8C4B] text-sm tracking-wider uppercase">
                    {member.role}
                  </p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#BB8C4B]/0 to-[#BB8C4B]/0 group-hover:from-[#BB8C4B]/20 group-hover:to-[#222227]/40 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

{/* CTA Section */}
      <div className="bg-gradient-to-r from-[#BB8C4B] to-[#D79A4A] text-white py-16 mb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Book your appointment today and discover why we're the best choice
            for modern grooming
          </p>
          <button className="group relative px-12 py-4 bg-white text-[#BB8C4B] font-bold rounded-xl hover:bg-[#fdfbf8] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-[#D79A4A]">
            Make an Appointment
            {/* Decorative corners */}
            <span className="absolute -top-1 -left-1 w-5 h-2 border-t-2 border-l-2 border-[#D79A4A] transition-all duration-300 group-hover:h-5 group-hover:w-12" />
            <span className="absolute -top-1 -right-1 w-5 h-2 border-t-2 border-r-2 border-[#D79A4A] transition-all duration-300 group-hover:h-5 group-hover:w-12" />
            <span className="absolute -bottom-1 -left-1 w-5 h-2 border-b-2 border-l-2 border-[#D79A4A] transition-all duration-300 group-hover:h-5 group-hover:w-12" />
            <span className="absolute -bottom-1 -right-1 w-5 h-2 border-b-2 border-r-2 border-[#D79A4A] transition-all duration-300 group-hover:h-5 group-hover:w-12" />
          </button>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.3s backwards;
        }

        .animate-fade-in-up-delay {
          animation: fade-in-up 1s ease-out 0.5s backwards;
        }
      `}</style>
    </div>
  );
};

export default About;