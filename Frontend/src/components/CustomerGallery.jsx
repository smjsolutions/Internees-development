import React, { useEffect, useState } from "react";

const CustomerGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/gallery/Customer/active")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching gallery:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-12 w-12 border-4 border-indigo-400 border-t-transparent rounded-full"></div>
      </div>
    );

  if (images.length === 0)
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No images available in the gallery.</p>
      </div>
    );

  return (
    <div className="py-12 px-4 mt-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl text-[#BB8C4B] font-bold">Gallery</h1>
        <p className="text-gray-500 text-lg">Explore Our Gallery</p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-12 gap-4">
        {images.map((img, index) => {
          // Pattern: every 3 images, first is large, next two are small
          const positionInPattern = index % 3;
          const isLarge = positionInPattern === 0;

          return (
            <div
              key={img._id}
              className={`relative group overflow-hidden rounded-lg ${
                isLarge ? "col-span-12 md:col-span-6" : "col-span-12 md:col-span-3"
              }`}
            >
              <img
                src={`http://localhost:5000/${img.image_url.replace(/\\/g, "/")}`}
                alt="gallery"
                className={`w-full object-cover block transition-all duration-500 group-hover:scale-110 group-hover:blur-sm ${
                  isLarge ? "h-64 md:h-96" : "h-64 md:h-96"
                }`}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition flex justify-center items-center">
                <i className={`fa fa-eye text-white ${isLarge ? "text-4xl" : "text-3xl"}`}></i>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <p className="text-center text-gray-500 mt-10">
        Showing {images.length} image{images.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
};

export default CustomerGallery;
