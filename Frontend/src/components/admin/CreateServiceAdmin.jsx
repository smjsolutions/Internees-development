import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CreateServiceAdmin() {
  const navigate = useNavigate();

  // Initialize service state with a single price
  const [service, setService] = useState({
    name: "",
    category: "",
    description: "",
    duration: "",
    pricing: 0, // single price now
    images: [],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  // Handle pricing input change
  const handlePricingChange = (value) => {
    setService({ ...service, pricing: Number(value) });
  };

  // Handle image uploads
  const handleImageChange = (e) => {
    setService({ ...service, images: Array.from(e.target.files) });
  };

  // Submit form
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
      formData.append("pricing", JSON.stringify([service.pricing])); // wrap in array for backend
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
      <main className="flex-1">
        <section className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Create New Service</h2>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
            {/* Service Name */}
            <div>
              <label className="block mb-1 font-medium">Service Name</label>
              <input
                type="text"
                name="name"
                value={service.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={service.category}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                name="description"
                value={service.description}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block mb-1 font-medium">Duration</label>
              <input
                type="text"
                name="duration"
                value={service.duration}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="e.g., 2 hours"
                required
              />
            </div>

            {/* Single Pricing */}
            <div>
              <label className="block mb-1 font-medium">Price</label>
              <input
                type="number"
                placeholder="Price"
                value={service.pricing}
                onChange={(e) => handlePricingChange(e.target.value)}
                className="w-32 border border-gray-300 p-2 rounded"
                required
              />
            </div>

            {/* Images */}
            <div>
              <label className="block mb-1 font-medium">Images</label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              {loading ? "Creating..." : "Create Service"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
