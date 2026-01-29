import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function UpdateServiceAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState({
    name: "",
    category: "",
    description: "",
    duration: "",
    pricing: "", // changed to string like Create
    images: [],
  });

  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch service by ID
  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/services`);
        const found = data.data.find((s) => s._id === id);

        if (!found) return alert("Service not found");

        setService({
          name: found.name,
          category: found.category,
          description: found.description,
          duration: found.duration,
          pricing: found.pricing || "", // string now
          images: found.images || [],
        });
      } catch (err) {
        alert("Failed to load service");
      }
    };

    fetchService();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handlePricingChange = (value) => {
    setService({ ...service, pricing: value }); // string like Create
  };

  const handleImageChange = (e) => {
    setNewImages(Array.from(e.target.files));
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

      // Send pricing as string, not array
      formData.append("pricing", service.pricing);

      newImages.forEach((img) => formData.append("images", img));

      await axios.put(`${API_BASE_URL}/api/services/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/services-admin");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6">
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-gray-800">
            Update Service
          </h2>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-4 sm:p-6 rounded-lg shadow-md"
          >
            {/* Service Name */}
            <div>
              <label className="block mb-1 font-medium">Service Name</label>
              <input
                type="text"
                name="name"
                value={service.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
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
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
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
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                rows={4}
                required
              />
            </div>

            {/* Duration and Pricing */}
            <div className="flex flex-col sm:flex-row sm:gap-6">
              <div className="flex-1">
                <label className="block mb-1 font-medium">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={service.duration}
                  onChange={handleChange}
                  placeholder="e.g., 2 hours"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />
              </div>

              <div className="flex-1 mt-4 sm:mt-0">
                <label className="block mb-1 font-medium">Price</label>
                <input
                  type="text" // changed to string
                  value={service.pricing}
                  onChange={(e) => handlePricingChange(e.target.value)}
                  placeholder="e.g., $50 or ₹5000"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />
              </div>
            </div>

            {/* Existing Images */}
            {service.images.length > 0 && (
              <div>
                <label className="block mb-1 font-medium">Current Images</label>
                <div className="flex gap-3 flex-wrap">
                  {service.images.map((img, i) => (
                    <img
                      key={i}
                      src={`${API_BASE_URL.replace("/api", "")}/${img}`}
                      alt="service"
                      className="w-20 h-20 object-cover rounded border"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Upload New Images */}
            <div>
              <label className="block mb-1 font-medium">
                Replace Images (optional)
              </label>
              <input type="file" multiple onChange={handleImageChange} />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto"
              >
                {loading ? "Updating..." : "Update Service"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/services-admin")}
                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
