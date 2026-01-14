import React from "react";

const Packages = () => {
  return (
    <section className="bg-[#faf7f2] mt-10 py-16">
      <div className="max-w-7xl mx-auto container  px-4 sm:px-6 lg:px-12 ">
        <div className="grid md:grid-cols-2 gap-12">
          {/* GOLD PACKAGE */}
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif uppercase tracking-wide">
                Gold Package{" "}
                <span className="text-base normal-case">( 2 Days )</span>
              </h2>
              <span className="text-4xl font-bold text-[#c0954d]">20000/-</span>
            </div>

            {/* Content */}
            <div className="grid grid-cols-2 gap-6 text-gray-600">
              <ul className="space-y-3 list-disc list-inside">
                <li>Hair Cut (800 - 1500)</li>
                <li>Neck Polish</li>
                <li>Pedicure Simple</li>
                <li>Makeover</li>
                <li>Shower & Refresh</li>
                <li>Hand Polish</li>
                <li>
                  Shower & Refresh (even skin tone + diamond face wash + body
                  wash)
                </li>
              </ul>

              <ul className="space-y-3 list-disc list-inside">
                <li>Shave / Beard</li>
                <li>Manicure</li>
                <li>Even Skin Tone (facial)</li>
                <li>Styling</li>
                <li>Cleansing</li>
                <li>Foot Polish</li>
              </ul>
            </div>

            {/* Button */}
            <button
              className="mt-10 bg-[#c0954d] text-white px-8 py-3 font-semibold 
            hover:bg-[#a77e3f] transition-all duration-300 rounded-md
            hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            >
              BOOK NOW
            </button>
          </div>

          {/* PLATINUM PACKAGE */}
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif uppercase tracking-wide">
                Platinum Package{" "}
                <span className="text-base normal-case">( 3 Days )</span>
              </h2>
              <span className="text-4xl font-bold text-[#c0954d]">25000/-</span>
            </div>

            {/* Content */}
            <div className="grid grid-cols-2 gap-6 text-gray-600">
              <ul className="space-y-3 list-disc list-inside">
                <li>Hair Cut (800 - 1500)</li>
                <li>Signature Pedicure</li>
                <li>Manicure</li>
                <li>Cleansing (dry skin)</li>
                <li>Foot Polish</li>
                <li>Head & Shoulder Massage (with aromatic)</li>
              </ul>

              <ul className="space-y-3 list-disc list-inside">
                <li>Shave / Beard</li>
                <li>Even Skin Tone (with mask)</li>
                <li>
                  Styling Shower & Refresh (with fresh towel, refresh face &
                  wash, refresh body)
                </li>
                <li>Hand Polish</li>
                <li>Styling</li>
              </ul>
            </div>

            {/* Button */}
            <button
              className="mt-10 bg-[#c0954d] text-white px-8 py-3 font-semibold 
            hover:bg-[#a77e3f] transition-all duration-300  rounded-md
                hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            >
              BOOK NOW
            </button>
          </div>
          {/* DIAMOND PACKAGE */}
          {/* DIAMOND PACKAGE */}
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif uppercase tracking-wide">
                Diamond Package{" "}
                <span className="text-base normal-case">( 4 Days )</span>
              </h2>
              <span className="text-4xl font-bold text-[#c0954d]">35000/-</span>
            </div>

            {/* Content */}
            <div className="grid grid-cols-2 gap-6 text-gray-600">
              <ul className="space-y-3 list-disc list-inside">
                <li>Hair Cut ( 800 - 1500 )</li>
                <li>Signature Manicure</li>
                <li>Skin Brightening (Luminous)</li>
                <li>Shower & Refresh</li>
                <li>Styling</li>
                <li>Foot Polish</li>
                <li>Head & Shoulder Massage (with aromatic)</li>
                <li>
                  Shower & Refresh (30 min total: 15 min face + 15 min body)
                </li>
              </ul>

              <ul className="space-y-3 list-disc list-inside">
                <li>Shave / Beard</li>
                <li>Signature Pedicure</li>
                <li>Rejex Rejuv</li>
                <li>Cleansing</li>
                <li>Hand Polish</li>
                <li>Makeover</li>
                <li>
                  Foot Massage (30 min not water edge & 30 min massage only)
                </li>
              </ul>
            </div>

            {/* Button */}
            <button
              className="mt-10 bg-[#c0954d] text-white px-8 py-3 font-semibold 
            hover:bg-[#a77e3f] transition-all duration-300 rounded-md
            hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;