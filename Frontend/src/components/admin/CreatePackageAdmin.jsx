import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CreatePackageAdmin() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: "",
    services: [],
    totalDuration: "",
    price: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/services`).then((res) => {
      setServices(res.data.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("services", JSON.stringify(form.services));
      formData.append("totalDuration", form.totalDuration);
      formData.append("price", form.price);
      if (form.image) formData.append("image", form.image);

      await axios.post(`${API_BASE_URL}/api/packages`, formData);
      navigate("/packages-admin");
    } catch (err) {
      console.error(err);
      setError("Failed to create package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-12 py-6">
      <main className="flex-1 w-full">
        <section className="max-w-3xl mx-auto w-full">
          {/* PAGE TITLE */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center text-gray-800">
            Create New Package
          </h2>

          {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-6 md:space-y-8 bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow w-full"
          >
            {/* Package Name */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Package Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 p-2 sm:p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Services Multi Select */}
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
                      className="accent-green-600"
                    />
                    <span>{service.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Total Duration */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Total Duration
              </label>
              <input
                type="text"
                placeholder="e.g., 3 hours"
                value={form.totalDuration}
                onChange={(e) =>
                  setForm({ ...form, totalDuration: e.target.value })
                }
                className="w-full border border-gray-300 p-2 sm:p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Price
              </label>
              <input
                type="text"
                placeholder="e.g., Rs5000"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full sm:w-48 border border-gray-300 p-2 sm:p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Image */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Package Image
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files[0] })
                }
                className="w-full"
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
              >
                {loading ? "Creating..." : "Create Package"}
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
