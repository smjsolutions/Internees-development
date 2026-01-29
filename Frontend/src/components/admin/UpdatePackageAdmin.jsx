import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function UpdatePackageAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: "",
    services: [],
    totalDuration: "",
    price: "",
    image: null,
    existingImage: "",
  });

  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pkgRes, serviceRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/packages`),
          axios.get(`${API_BASE_URL}/api/services`),
        ]);

        const pkg = pkgRes.data.data.find((p) => p._id === id);

        setForm({
          name: pkg.name,
          services: pkg.services.map((s) => s._id),
          totalDuration: pkg.totalDuration,
          price: pkg.price,
          image: null,
          existingImage: pkg.image,
        });

        setServices(serviceRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("services", JSON.stringify(form.services));
    formData.append("totalDuration", form.totalDuration);
    formData.append("price", form.price);
    if (form.image) formData.append("image", form.image);

    await axios.put(`${API_BASE_URL}/api/packages/${id}`, formData);
    navigate("/packages-admin");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-12 py-6">
      <main className="flex-1 w-full">
        <section className="max-w-3xl mx-auto w-full">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 sm:space-y-8 bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow w-full"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center">
              Update Package
            </h2>

            {/* PACKAGE NAME */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Package Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 p-2 sm:p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* SERVICES MULTI SELECT */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Select Services
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-300 rounded p-3">
                {services.map((service) => (
                  <label
                    key={service._id}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={service._id}
                      checked={form.services.includes(service._id)}
                      onChange={(e) => {
                        const value = e.target.value;
                        setForm((prev) => ({
                          ...prev,
                          services: prev.services.includes(value)
                            ? prev.services.filter((id) => id !== value)
                            : [...prev.services, value],
                        }));
                      }}
                      className="accent-blue-600"
                    />
                    {service.name}
                  </label>
                ))}
              </div>
            </div>

            {/* DURATION AND PRICE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Total Duration
                </label>
                <input
                  value={form.totalDuration}
                  onChange={(e) =>
                    setForm({ ...form, totalDuration: e.target.value })
                  }
                  className="w-full border border-gray-300 p-2 sm:p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Price
                </label>
                <input
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                  className="w-full border border-gray-300 p-2 sm:p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* CURRENT IMAGE */}
            {form.existingImage && (
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Current Image
                </label>
                <img
                  src={`${API_BASE_URL.replace("/api", "")}/${form.existingImage}`}
                  alt="Current Package"
                  className="w-full sm:w-48 h-48 object-cover rounded border"
                />
              </div>
            )}

            {/* REPLACE IMAGE */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Replace Image (optional)
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files[0] })
                }
                className="w-full"
              />
            </div>

            {/* NEW IMAGE PREVIEW */}
            {form.image && (
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  New Image Preview
                </label>
                <img
                  src={URL.createObjectURL(form.image)}
                  alt="Preview"
                  className="w-full sm:w-48 h-48 object-cover rounded border"
                />
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row sm:justify-start gap-4 pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
              >
                Update Package
              </button>
              <button
                type="button"
                onClick={() => navigate("/packages-admin")}
                className="w-full sm:w-auto bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400 transition"
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
