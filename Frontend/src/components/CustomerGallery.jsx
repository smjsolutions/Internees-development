import React, { useEffect, useState } from "react";
import { FaEye, FaTimes } from "react-icons/fa";

const CustomerGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-12 w-12 border-4 border-[#BB8C4B] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No images available in the gallery.</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 mt-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#BB8C4B]">Gallery</h1>
        <p className="text-gray-500 text-lg">Explore Our Gallery</p>
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img._id}
            className="relative group overflow-hidden rounded-xl shadow-md"
          >
            <img
              src={`http://localhost:5000/${img.image_url.replace(/\\/g, "/")}`}
              alt="gallery"
              className="w-full h-auto md:h-72 lg:h-80 object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-50 transition flex justify-center items-center cursor-pointer">
              <div
                className="bg-[#BB8C4B] p-4 rounded-full flex justify-center items-center transform transition-transform duration-300 group-hover:scale-110"
                onClick={() =>
                  setSelectedImage(
                    `http://localhost:5000/${img.image_url.replace(/\\/g, "/")}`
                  )
                }
              >
                <FaEye className="text-white text-3xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-center text-gray-500 mt-10">
        Showing {images.length} image{images.length !== 1 ? "s" : ""}
      </p>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
          {/* Close Button */}
          <button
            className="absolute top-5 right-5 text-white text-3xl z-50 hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <FaTimes />
          </button>

          {/* Full-size Image */}
          <img
            src={selectedImage}
            alt="full gallery"
            className="
              w-full max-w-full max-h-[80vh]
              md:max-w-screen-md md:max-h-[90vh]
              lg:max-w-screen-lg lg:max-h-[90vh]
              rounded-lg shadow-lg object-contain
              transition-transform duration-300 ease-out scale-0
            "
            onLoad={(e) => e.currentTarget.classList.add("scale-100")}
          />
        </div>
      )}
    </div>
  );
};

export default CustomerGallery;
