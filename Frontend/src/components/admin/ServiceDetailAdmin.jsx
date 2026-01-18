import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ServiceDetailsAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchService = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/services`);
      const found = res.data.data.find((s) => s._id === id);
      setService(found);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchService();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (!service)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Service not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-6 px-4 sm:px-6">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-4 sm:p-6 md:p-8 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Service Details</h2>
          <button
            onClick={() => navigate("/services-admin")}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition w-full sm:w-auto"
          >
            Back
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row md:gap-6">
          {/* Images */}
          <div className="md:w-1/2 flex flex-col gap-3">
            {service.images?.length > 0 ? (
              service.images.map((img, idx) => (
                <img
                  key={idx}
                  src={`${API_BASE_URL.replace("/api", "")}/${img}`}
                  className="w-full h-60 md:h-64 object-cover rounded-lg border"
                />
              ))
            ) : (
              <div className="w-full h-60 md:h-64 bg-gray-200 rounded-lg" />
            )}
          </div>

          {/* Info */}
          <div className="md:w-1/2 mt-4 md:mt-0 space-y-3">
            <p>
              <span className="font-semibold text-gray-700">Name:</span>{" "}
              <span className="text-gray-900 break-words">{service.name}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-700">Category:</span>{" "}
              <span className="text-gray-900 break-words">{service.category}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-700">Duration:</span>{" "}
              <span className="text-gray-900 break-words">{service.duration}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-700">Price:</span>{" "}
              <span className="text-gray-900">{service.pricing || "N/A"}</span>
            </p>

            {/* Description */}
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-700 break-words">{service.description}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={() => navigate(`/update-service/${service._id}`)}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Edit Service
          </button>
          <button
            onClick={() => navigate("/services-admin")}
            className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition w-full sm:w-auto"
          >
            Back to List
          </button>
        </div>

      </div>
    </div>
  );
}
