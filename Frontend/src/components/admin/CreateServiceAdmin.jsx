import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CreateServiceAdmin() {
  const navigate = useNavigate();

  const [service, setService] = useState({
    name: "",
    category: "",
    description: "",
    duration: "",
    pricing: 0,
    images: [],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handlePricingChange = (value) => {
    setService({ ...service, pricing: Number(value) });
  };

  const handleImageChange = (e) => {
    setService({ ...service, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", service.name);
      formData.append("category", service.category);
      formData.append("description", service.description);
      formData.append("duration", service.duration);
      formData.append("pricing", JSON.stringify([service.pricing]));
      service.images.forEach((img) => formData.append("images", img));

      const { data } = await axios.post(`${API_BASE_URL}/api/services`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        navigate("/services-admin");
      } else {
        setError("Failed to create service");
      }
    } catch (err) {
      console.log(err);
      setError("Error creating service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 w-full">
        <section className="p-6 sm:p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center text-gray-800">
            Create New Service
          </h2>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-6 md:space-y-8 bg-white p-4 sm:p-6 md:p-8 rounded shadow max-w-3xl mx-auto"
          >
            {/* Service Name */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Service Name</label>
              <input
                type="text"
                name="name"
                value={service.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 sm:p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={service.category}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 sm:p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={service.description}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 sm:p-3 rounded h-24 sm:h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Duration</label>
              <input
                type="text"
                name="duration"
                value={service.duration}
                onChange={handleChange}
                placeholder="e.g., 2 hours"
                className="w-full border border-gray-300 p-2 sm:p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Pricing */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Price</label>
              <input
                type="number"
                placeholder="Price"
                value={service.pricing}
                onChange={(e) => handlePricingChange(e.target.value)}
                className="w-full sm:w-48 border border-gray-300 p-2 sm:p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Images */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Images</label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full sm:w-auto"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              {loading ? "Creating..." : "Create Service"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
