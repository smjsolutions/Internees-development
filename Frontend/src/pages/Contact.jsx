import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Our Location',
      content: 'Club Road, Near Dessert Palm Hotel',
      subContent: 'Rahim Yar Khan, Pakistan'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone Numbers',
      content: 'PTCL: 0685872060',
      subContent: 'Cell: 03406465222'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Address',
      content: 'info@diamondtrimpk.com',
      subContent: 'diamondtrimpk@gmail.com'
    }
  ];

  const openingHours = [
    { days: 'Monday - Friday', hours: '09:00 AM - 10:00 PM' },
    { days: 'Saturday', hours: '10:00 AM - 10:00 PM' },
    { days: 'Sunday', hours: '12:00 PM - 10:00 PM' }
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Pexels Background Image */}
      <div className="relative overflow-hidden pt-20">
        {/* Background Image from Pexels - Modern Barbershop Interior */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          }}
        >
          {/* Dark Overlay with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#222227]/95 via-[#2d2d2d]/90 to-[#BB8C4B]/85"></div>
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center space-y-6">
            <div className="inline-block animate-fade-in">
              <span className="px-4 py-2 bg-[#BB8C4B]/20 border border-[#BB8C4B]/30 rounded-full text-[#D79A4A] text-sm font-medium tracking-wider backdrop-blur-sm">
                CONTACT US
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-white animate-fade-in-up">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay">
              Send us a message today and let's create something amazing together
            </p>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="relative">
          <svg className="w-full h-16 fill-current text-[#faf8f5]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Contact Info Cards - Updated colors */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <div 
              key={index}
              className="group bg-[#fdfbf8] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                style={{ backgroundColor: '#BB8C4B' }}
              >
                {info.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-[#222227] mb-3">
                {info.title}
              </h3>
              <p className="text-gray-700 font-medium mb-1">
                {info.content}
              </p>
              <p className="text-gray-600">
                {info.subContent}
              </p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form - Updated colors */}
          <div className="bg-[#fdfbf8] rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-12 bg-[#BB8C4B]"></div>
                <span className="text-[#BB8C4B] font-semibold tracking-wider uppercase text-sm">
                  Send Message
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#222227]">
                Drop Us a Line
              </h2>
              <p className="text-gray-600 mt-3">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#BB8C4B] focus:ring-2 focus:ring-[#BB8C4B]/20 transition-all outline-none bg-white"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#BB8C4B] focus:ring-2 focus:ring-[#BB8C4B]/20 transition-all outline-none bg-white"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#BB8C4B] focus:ring-2 focus:ring-[#BB8C4B]/20 transition-all outline-none bg-white"
                    placeholder="+92 300 1234567"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#BB8C4B] focus:ring-2 focus:ring-[#BB8C4B]/20 transition-all outline-none resize-none bg-white"
                  placeholder="Tell us about your grooming needs..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="group relative w-full bg-[#BB8C4B] text-black font-bold py-4 rounded-xl border border-[#D79A4A] hover:bg-[#A97C42] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent Successfully!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
                {/* Decorative corners */}
                <span className="absolute -top-2 -left-2 w-7 h-3 border-t-2 border-l-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
                <span className="absolute -top-2 -right-2 w-7 h-3 border-t-2 border-r-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
                <span className="absolute -bottom-2 -left-2 w-7 h-3 border-b-2 border-l-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
                <span className="absolute -bottom-2 -right-2 w-7 h-3 border-b-2 border-r-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
              </button>
            </form>
          </div>

          {/* Map and Opening Hours */}
          <div className="space-y-8">
            {/* Google Map - Updated colors */}
            <div className="bg-[#fdfbf8] rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="h-80 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2672.63445736865!2d70.31228587408513!3d28.4286293933135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39375becf75d90b7%3A0x72b08d77ca1f9bbf!2sRoyal%20Desert%20Palm%20Hotel!5e1!3m2!1sen!2s!4v1769520165614!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Diamond Trim Location"
                ></iframe>
              </div>
              <div className="p-6 bg-gradient-to-br from-[#222227] to-[#BB8C4B] text-white">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#D79A4A] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-serif font-bold text-lg mb-1">Visit Our Salon</h3>
                    <p className="text-gray-200">
                      Club Road, Near Dessert Palm Hotel<br />
                      Rahim Yar Khan, Pakistan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours - Updated colors */}
            <div className="bg-[#fdfbf8] rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg"
                  style={{ backgroundColor: '#BB8C4B' }}
                >
                  <Clock className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#222227]">Opening Hours</h3>
                  <p className="text-gray-600">We're here to serve you</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {openingHours.map((schedule, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center p-4 bg-white rounded-xl hover:bg-[#faf8f5] transition-colors border border-gray-100"
                  >
                    <span className="font-semibold text-gray-700">{schedule.days}</span>
                    <span className="text-[#BB8C4B] font-bold">{schedule.hours}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-[#faf8f5] to-[#f5f1ea] rounded-xl border border-[#BB8C4B]/20">
                <p className="text-sm text-gray-700 text-center">
                  <strong className="text-[#BB8C4B]">Note:</strong> Walk-ins welcome, but appointments are recommended for guaranteed service
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

   {/* CTA Section - Updated colors */}
      <div className="bg-gradient-to-r from-[#222227] to-[#BB8C4B] text-white py-16 mb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready for Your Best Look?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Experience premium grooming services at Diamond Trim Beauty Studio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:0685872060"
              className="group relative px-8 py-4 bg-white text-[#BB8C4B] font-bold rounded-xl hover:bg-[#fdfbf8] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-[#D79A4A]"
            >
              Call Now: 0685872060
              {/* Decorative corners */}
              <span className="absolute -top-1 -left-1 w-5 h-2 border-t-2 border-l-2 border-[#D79A4A] transition-all duration-300 group-hover:h-5 group-hover:w-12" />
              <span className="absolute -top-1 -right-1 w-5 h-2 border-t-2 border-r-2 border-[#D79A4A] transition-all duration-300 group-hover:h-5 group-hover:w-12" />
              <span className="absolute -bottom-1 -left-1 w-5 h-2 border-b-2 border-l-2 border-[#D79A4A] transition-all duration-300 group-hover:h-5 group-hover:w-12" />
              <span className="absolute -bottom-1 -right-1 w-5 h-2 border-b-2 border-r-2 border-[#D79A4A] transition-all duration-300 group-hover:h-5 group-hover:w-12" />
            </a>
            <a 
              href="tel:03406465222"
              className="group relative px-8 py-4 bg-[#BB8C4B] text-white font-bold rounded-xl hover:bg-[#A97C42] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-[#D79A4A]"
            >
              Cell: 03406465222
              {/* Decorative corners */}
              <span className="absolute -top-1 -left-1 w-5 h-2 border-t-2 border-l-2 border-white transition-all duration-300 group-hover:h-5 group-hover:w-12" />
              <span className="absolute -top-1 -right-1 w-5 h-2 border-t-2 border-r-2 border-white transition-all duration-300 group-hover:h-5 group-hover:w-12" />
              <span className="absolute -bottom-1 -left-1 w-5 h-2 border-b-2 border-l-2 border-white transition-all duration-300 group-hover:h-5 group-hover:w-12" />
              <span className="absolute -bottom-1 -right-1 w-5 h-2 border-b-2 border-r-2 border-white transition-all duration-300 group-hover:h-5 group-hover:w-12" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
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

export default Contact;