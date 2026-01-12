import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi"; // React Icons

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/services`);
      if (data.success) {
        setServices(data.data);
      } else {
        setError("Failed to fetch services");
      }
    } catch (err) {
      setError("Error fetching services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const confirmDelete = (id) => {
    setServiceToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/services/${serviceToDelete}`);
      setShowModal(false);
      setServiceToDelete(null);
      fetchServices();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting service");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-service/${id}`);
  };

  const handleView = (id) => {
    navigate(`/service-details/${id}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">All Services</h2>
        <button
          onClick={() => navigate("/create-service")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Create New Service
        </button>
      </div>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Duration</th>
              <th className="py-3 px-4 text-left">Pricing</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.length > 0 ? (
              services.map((service, index) => (
                <tr
                  key={service._id}
                  className={`border-t ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="py-2 px-4">
                    {service.images && service.images.length > 0 ? (
                     <img
  src={`${API_BASE_URL.replace("/api", "")}/${service.images[0]}`}
  alt={service.name}
  className="w-12 h-12 object-cover rounded-md"
/>

                    ) : (
                      <span className="text-gray-400 text-sm">No Image</span>
                    )}
                  </td>

                  <td className="py-2 px-4 font-medium text-gray-800">{service.name}</td>
                  <td className="py-2 px-4">{service.category}</td>
                  <td className="py-2 px-4">{service.description}</td>
                  <td className="py-2 px-4">{service.duration}</td>
                  <td className="py-2 px-4">
                   {service.pricing?.length > 0
  ? service.pricing.map((p, i) => (
      <div key={i}>${p}</div>
    ))
  : "N/A"}

                  </td>

                  {/* Actions */}
                  <td className="py-2 px-4 text-center space-x-2">
                    <button
                      onClick={() => handleView(service._id)}
                      className="p-2 rounded-full hover:bg-amber-100 text-amber-600 hover:text-amber-800 transition"
                      title="View Details"
                    >
                      <FiEye size={18} />
                    </button>

                    <button
                      onClick={() => handleUpdate(service._id)}
                      className="p-2 rounded-full hover:bg-blue-100 text-blue-600 hover:text-blue-800 transition"
                      title="Edit Service"
                    >
                      <FiEdit size={18} />
                    </button>

                    <button
                      onClick={() => confirmDelete(service._id)}
                      className="p-2 rounded-full hover:bg-red-100 text-red-600 hover:text-red-800 transition"
                      title="Delete Service"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500 italic">
                  No services found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 text-center mb-5">
              Are you sure you want to delete this service?
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllServices;
