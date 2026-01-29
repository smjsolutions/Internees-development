import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GalleryList() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  // Fetch all images
  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/gallery");
      if (res.data && Array.isArray(res.data)) {
        setImages(res.data);
        setError("");
      } else {
        setImages([]);
        setError("No images found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Delete
  const confirmDelete = (image) => {
    setSelectedImage(image);
    setShowDeleteModal(true);
  };

  const deleteImage = async () => {
    if (!selectedImage) return;
    try {
      await axios.delete(`http://localhost:5000/api/gallery/${selectedImage._id}`);
      fetchImages();
      setShowDeleteModal(false);
      setSelectedImage(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete image");
    }
  };

  if (loading) return <p className="p-6">Loading images...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">All Gallery Images</h2>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
          >
            {/* Image container */}
            <div className="w-full h-60 overflow-hidden rounded-t-lg flex items-center justify-center bg-gray-100">
              {img.image_url ? (
                <img
                  src={`http://localhost:5000/${img.image_url.replace(/\\/g, "/")}`}
                  alt={img.title || "Gallery Image"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* Card content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{img.title || "No Title"}</h3>
              <p className="text-sm text-gray-500">{img.category || "No Category"}</p>

              <span
                className={`text-xs px-2 py-1 rounded inline-block mt-2 ${
                  img.status === "active"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {img.status || "inactive"}
              </span>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/gallery/edit/${img._id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(img)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
            <p className="mb-4">
              Do you really want to delete <strong>{selectedImage.title}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={deleteImage}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
