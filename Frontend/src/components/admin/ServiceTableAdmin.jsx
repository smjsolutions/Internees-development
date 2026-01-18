import { FiEye, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ServicesTableAdmin({ services }) {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState(null);
  const [deleteServiceName, setDeleteServiceName] = useState("");

  const openDeleteModal = (id, name) => {
    setDeleteServiceId(id);
    setDeleteServiceName(name);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteServiceId(null);
    setDeleteServiceName("");
  };

  const handleDelete = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/services/${deleteServiceId}`, {
        method: "DELETE",
      });

      // close modal
      closeDeleteModal();

      // refresh page (or update state in parent for smoother UX)
      window.location.reload();
    } catch (err) {
      console.error("Failed to delete service:", err);
      alert("Failed to delete service.");
    }
  };

  return (
    <div className="w-full space-y-4 relative">
      {/* ================= CREATE NEW SERVICE BUTTON ================= */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Services</h2>
        <button
          onClick={() => navigate("/create-service")}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <FiPlus size={16} />
          Create New Service
        </button>
      </div>

      {/* ================= DESKTOP / TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* TABLE HEADER */}
          <div
            className="
              grid
              grid-cols-[60px_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,2.2fr)_80px_80px_90px]
              bg-gray-100 text-gray-700 font-semibold
              text-xs lg:text-sm
              px-3 py-3
              gap-3
            "
          >
            <span>Image</span>
            <span>Name</span>
            <span>Category</span>
            <span>Description</span>
            <span>Duration</span>
            <span>Price</span>
            <span className="text-center">Actions</span>
          </div>

          {/* TABLE ROWS */}
          {services.map((service) => (
            <div
              key={service._id}
              className="
                grid
                grid-cols-[60px_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,2.2fr)_80px_80px_90px]
                px-3 py-4
                gap-3
                items-start
                border-t
                text-xs lg:text-sm
                hover:bg-gray-50
              "
            >
              {/* Image */}
              <div>
                {service.images?.length ? (
                  <img
                    src={`${API_BASE_URL.replace("/api", "")}/${service.images[0]}`}
                    alt={service.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded" />
                )}
              </div>

              {/* Name */}
              <div className="font-medium break-normal leading-snug">
                {service.name}
              </div>

              {/* Category */}
              <div className="break-normal leading-snug">
                {service.category}
              </div>

              <div className="text-gray-600 leading-snug line-clamp-2">
                {service.description}
              </div>

              {/* Duration */}
              <div className="whitespace-nowrap text-xs lg:text-sm">
                {service.duration}
              </div>

              {/* Price */}
              <div className="whitespace-nowrap text-xs lg:text-sm">
                {service.pricing || "N/A"}
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => navigate(`/service-details/${service._id}`)}
                  className="p-1.5 rounded-full hover:bg-amber-100 text-amber-600"
                >
                  <FiEye size={14} />
                </button>

                <button
                  onClick={() => navigate(`/update-service/${service._id}`)}
                  className="p-1.5 rounded-full hover:bg-blue-100 text-blue-600"
                >
                  <FiEdit size={14} />
                </button>

                <button
                  onClick={() => openDeleteModal(service._id, service.name)}
                  className="p-1.5 rounded-full hover:bg-red-100 text-red-600"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MOBILE / CARD ================= */}
      <div className="md:hidden space-y-4 overflow-x-auto">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-lg shadow p-4 space-y-3"
          >
            <div className="flex gap-3">
              {service.images?.length ? (
                <img
                  src={`${API_BASE_URL.replace("/api", "")}/${service.images[0]}`}
                  className="w-14 h-14 rounded object-cover"
                />
              ) : (
                <div className="w-14 h-14 bg-gray-200 rounded" />
              )}

              <div>
                <h3 className="font-semibold">{service.name}</h3>
                <p className="text-sm text-gray-500">{service.category}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-snug line-clamp-3">
              {service.description}
            </p>

            <div className="flex justify-between text-sm">
              <span>
                <b>Duration:</b> {service.duration}
              </span>
              <span>
                <b>Price:</b> {service.pricing || "N/A"}
              </span>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <FiEye
                onClick={() => navigate(`/service-details/${service._id}`)}
                className="cursor-pointer text-amber-600"
              />
              <FiEdit
                onClick={() => navigate(`/update-service/${service._id}`)}
                className="cursor-pointer text-blue-600"
              />
              <FiTrash2
                onClick={() => openDeleteModal(service._id, service.name)}
                className="cursor-pointer text-red-600"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 sm:w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete <b>{deleteServiceName}</b>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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
