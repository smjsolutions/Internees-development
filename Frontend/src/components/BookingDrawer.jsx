import React from 'react';
import { IoClose } from "react-icons/io5";
import { useState } from "react";

export default function BookingDrawer({
  isOpen,
  onClose,
  service,
  price,
}) {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-[500px] lg:w-[600px] bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Scrollable Container */}
        <div className="h-full overflow-y-auto">

          {/* Header */}
          <div className="relative px-5 sm:px-8 py-6 sm:py-8 border-b text-center">
            <p className="text-[#BB8C4B] tracking-widest uppercase text-xs sm:text-sm mb-2">
              Get Styled
            </p>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-black">
              Book An Appointment
            </h3>

            <button
              onClick={onClose}
              className="absolute right-4 sm:right-6 top-4 sm:top-6"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-8 space-y-5">
            {/* Service + Price */}
            <div className="border-b pb-4 space-y-1 text-sm">
              <p>
                <span className="font-semibold">Service:</span>{" "}
                <span className="text-[#BB8C4B] font-medium">
                  {service}
                </span>
              </p>

              <p>
                <span className="font-semibold">Starting Price:</span>{" "}
                <span className="text-[#BB8C4B] font-medium">
                  Rs. {price}
                </span>
              </p>
            </div>

            {/* Inputs */}
            <input
              className="w-full h-[48px] sm:h-[52px] border px-4 outline-none"
              placeholder="Name"
            />

            <input
              className="w-full h-[48px] sm:h-[52px] border px-4 outline-none"
              placeholder="Your Email"
            />

            <input
              className="w-full h-[48px] sm:h-[52px] border px-4 outline-none"
              placeholder="Your Phone No"
            />

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-[48px] sm:h-[52px] border px-4 outline-none"
              />

              <select
                disabled={!selectedDate}
                className={`h-[48px] sm:h-[52px] border px-4 outline-none ${
                  !selectedDate ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <option>Select Time</option>
                <option>9:00 AM</option>
                <option>9:15 AM</option>
                <option>9:30 AM</option>
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
            </div>

            {/* Button */}
            <button
              className="
                group
                relative
                w-full
                mt-6
                py-3 sm:py-4
                bg-[#BB8C4B]
                text-black
                tracking-widest
                border
                border-[#D79A4A]
                font-medium
                transition-all
                duration-300
                hover:bg-[#A97C42]
                hover:text-white
              "
            >
              MAKE APPOINTMENT

              {/* Decorative corners */}
              <span className="absolute -top-2 -left-2 w-7 h-3 border-t-2 border-l-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
              <span className="absolute -top-2 -right-2 w-7 h-3 border-t-2 border-r-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
              <span className="absolute -bottom-2 -left-2 w-7 h-3 border-b-2 border-l-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
              <span className="absolute -bottom-2 -right-2 w-7 h-3 border-b-2 border-r-2 border-[#D79A4A] transition-all duration-300 group-hover:h-7 group-hover:w-20" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
