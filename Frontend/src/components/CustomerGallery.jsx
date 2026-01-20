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
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl text-indigo-600 font-bold">Gallery</h1>
        <p className="text-gray-500 text-lg">Explore Our Gallery</p>
      </div>

      <div className="grid grid-cols-12 gap-4">

        {/* Large Image 1 */}
        {images[0] && (
          <div className="col-span-12 md:col-span-6 relative group overflow-hidden rounded-lg">
            <img
              src={`http://localhost:5000/${images[0].image_url.replace(/\\/g, "/")}`}
              alt="gallery"
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition flex justify-center items-center">
              <i className="fa fa-eye text-white text-4xl"></i>
            </div>
          </div>
        )}

        {/* Next 2 small images */}
        {images.slice(1, 3).map((img) => (
          <div
            key={img._id}
            className="col-span-12 md:col-span-3 relative group overflow-hidden rounded-lg"
          >
            <img
              src={`http://localhost:5000/${img.image_url.replace(/\\/g, "/")}`}
              alt="gallery"
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition flex justify-center items-center">
              <i className="fa fa-eye text-white text-3xl"></i>
            </div>
          </div>
        ))}

        {/* Next 2 small images */}
        {images.slice(3, 5).map((img) => (
          <div
            key={img._id}
            className="col-span-12 md:col-span-3 relative group overflow-hidden rounded-lg"
          >
            <img
              src={`http://localhost:5000/${img.image_url.replace(/\\/g, "/")}`}
              alt="gallery"
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition flex justify-center items-center">
              <i className="fa fa-eye text-white text-3xl"></i>
            </div>
          </div>
        ))}

        {/* Last Large Image */}
        {images[5] && (
          <div className="col-span-12 md:col-span-6 relative group overflow-hidden rounded-lg">
            <img
              src={`http://localhost:5000/${images[5].image_url.replace(/\\/g, "/")}`}
              alt="gallery"
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition flex justify-center items-center">
              <i className="fa fa-eye text-white text-4xl"></i>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-gray-500 mt-10">
        Showing {images.length} image{images.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
};

export default CustomerGallery;

