import React from 'react';
import { useState } from "react";

export default function AppointmentSection() {
  const [selectedDate, setSelectedDate] = useState(""); // Track date selection

  return (
    <section className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">

        {/* LEFT IMAGE — hidden on small screens */}
        <div
          className="hidden lg:block bg-fixed bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/appointment.jpg')",
          }}
        />

        {/* RIGHT CONTENT — full width on small screens, 2/3 on lg */}
        <div
          className="relative lg:col-span-2 flex items-center justify-center bg-[#060606] text-white px-4 sm:px-6 lg:px-10 py-16 lg:py-24"
          style={{
            backgroundImage: "url('/images/satellite-map.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {/* OVERLAY */}
          <div className="absolute inset-0 bg-[#1f2024]/90" />

          <div className="relative w-full max-w-2xl">
            {/* HEADING */}
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-serif text-[#BB8C4B] mb-6 text-center lg:text-left">
              Make an appointment
            </h2>

            <p className="text-gray-400 mb-12 leading-relaxed max-w-lg text-center lg:text-left">
              Our beauty salon provides you with the highest levels of
              professional services for you to love and celebrate yourself
              even more...!
            </p>

            {/* FORM */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-4 sm:gap-y-6">
              <input
                type="text"
                placeholder="Name"
                className="h-[56px] bg-white text-black px-4 sm:px-6 outline-none w-full"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="h-[56px] bg-white text-black px-4 sm:px-6 outline-none w-full"
              />

              <input
                type="text"
                placeholder="Your Phone No"
                className="h-[56px] bg-white text-black px-4 sm:px-6 outline-none w-full"
              />

              <select className="h-[56px] bg-white text-black px-4 sm:px-6 outline-none w-full">
                <option>Select Service</option>
                <option>Simple Haircut Men</option>
                <option>Fade Haircut</option>
                <option>Signature Cut</option>
                   <option>Beared Shave</option>
                <option>Beared Trim</option>
                <option>Fade Beard</option>
                <option>Shave</option>
                   <option>Protien Hair Restore</option>
                <option>Long Hair Restore</option>
                <option>Repair & Rescue</option>
                <option>Long Hair Repairing Rescue</option>
                   <option>Anti Dandruff</option>
                <option>Long Hair Anti Dandruff</option>
                <option>Hair Color Application</option>
                <option>With Wash</option>
                   <option>Beared Color Application</option>
                <option>Scalp Massage (10min) </option>
                <option>Scalp Massage (15min)</option>
                <option>Head and Shoulder Massage (15 min)</option>
                   <option>Head and Shoulder Massage 15 min with Vsibrator</option>
                <option>Foot Massage</option>
                <option>Hand Polish</option>
                <option>Feet Polish</option>
                          <option>Menicure Simple</option>
                <option>Menicure with Polish</option>
                <option>Pedicure Simple</option>
                <option>Pedicure with Polish</option>
                   <option>Signature Menicure</option>
                <option>Signature Pedicure</option>
                <option>Full Arm Polish and Scrubbing</option>
                <option>Simple Cleansing </option>
                   <option>Peeling Cleansing</option>
                <option>Whitening Cleansing</option>
                <option>Mini Facial</option>
                <option>Johnson Expressive Cleansing</option>
                   <option>The Bodyshop Expressive Cleansing</option>
                <option>Dermalogica Expressive Cleansing</option>
                <option>Under Eye Mask</option>
                <option>Under Eye Treatment</option>
                   <option>Face Polish</option>
                <option>Hydro Jelly Mask</option>
                <option>Black Mask</option>
                <option>Hand Polish (Add on Service)</option>
                   <option>Feet Polish (Add on Service)</option>
                <option>Neck Polish (Add on Service)</option>
                <option>Neck Cleansing</option>
                <option>Lightning Streaking PER Strip</option>
                  <option>Lightning Sreaking Long</option>
                <option>Sreaking with Cap</option>
                   <option>Silver Gray Hair Streaking</option>
                <option>Silver Gray Hair Streaking Long</option>
                <option>Beared Cutdown</option>
                <option>Mustache Service</option>
                   <option>Express Skin Palmer</option>
                <option>Express Skin Johson</option>
                <option>Express Skin Cute Pilas</option>
                <option>eveline Even Skin Tone</option>
                   <option>Janssen Facial</option>
                <option>The Bodyshop Expressive Facial</option>
                <option>Dermalogica Facial</option>
                <option>Cheeks Threading</option>
                  <option>Body shop</option>
                <option>Men Diamond Trim Hair Dye</option>
                   <option>Keune Hair Dye</option>
                <option>Loreal Hair Dye</option>
                <option>Just For Men Dye</option>
                <option>Deep Cleansing Janssen</option>
              </select>

              {/* Date input */}
              <input
                type="date"
                className="h-[56px] bg-white text-black px-4 sm:px-6 outline-none w-full"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />

              {/* Time select — disabled until date is chosen */}
              <select
                className={`h-[56px] bg-white text-black px-4 sm:px-6 outline-none w-full ${
                  !selectedDate ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!selectedDate}
              >
                <option>Select Time</option>
                <option>9:00 AM</option>
                <option>9:15 AM</option>
                <option>09:30 AM</option>
                 <option>9:45 AM</option>
                <option>10:00 AM</option>
                <option>10:15 AM</option>
                 <option>10:30 AM</option>
                <option>10:45 AM</option>
                <option>11:00 AM</option>
                 <option>11:15 AM</option>
                <option>11:30 AM</option>
                <option>11:45 AM</option>
                 <option>12:00 PM</option>
                <option>12:15 PM</option>
                <option>12:30 PM</option>
                 <option>12:45 PM</option>
                <option>1:00 PM</option>
                <option>1:15 PM</option>
                  <option>1:30 PM</option>
                <option>1:45 PM</option>
                <option>2:00 PM</option>
                 <option>2:15 PM</option>
                <option>2:30 PM</option>
                <option>2:45 PM</option>
                  <option>3:00 PM</option>
                <option>3:15 PM</option>
                <option>3:30 PM</option>
                 <option>3:45 PM</option>
                <option>4:00 PM</option>
                <option>4:15 PM</option>
                   <option>4:30 PM</option>
                <option>4:45 PM</option>
                  <option>5:00 PM</option>
                <option>5:15 PM</option>
                <option>5:30 PM</option>
              
              </select>
            </form>

            {/* MAKE APPOINTMENT BUTTON */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <button
                className="
                  group
                  relative
                  px-10 sm:px-12
                  py-3 sm:py-4
                  bg-[#BB8C4B]
                  text-black
                  text-base
                  tracking-widest
                  border
                  border-[#D79A4A]
                  font-medium
                  transition-all
                  duration-300
                  hover:bg-[#A97C42]
                  hover:text-white
                  w-full sm:w-auto
                "
              >
                Make Appointment
                {/* Decorative corners */}
                <span className="absolute -top-2 -left-2 w-7 h-3 border-t-2 border-l-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
                <span className="absolute -top-2 -right-2 w-7 h-3 border-t-2 border-r-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
                <span className="absolute -bottom-2 -left-2 w-7 h-3 border-b-2 border-l-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
                <span className="absolute -bottom-2 -right-2 w-7 h-3 border-b-2 border-r-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
