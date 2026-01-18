import { FiEye, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function PackagesTableAdmin({ packages }) {
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState(null);

  const toggleStatus = async (id) => {
    try {
      setLoadingId(id);

      const res = await fetch(`${API_BASE_URL}/api/packages/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!data.success) {
        alert(data.message || "Failed to update status");
        return;
      }

      window.location.reload();
    } catch (error) {
      alert("Server error");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="w-full space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Packages</h2>
        <button
          onClick={() => navigate("/create-package")}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          <FiPlus /> Create Package
        </button>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <div className="rounded-lg shadow overflow-hidden">
          {/* HEADER */}
          <div className="grid grid-cols-[80px_1.5fr_2fr_1fr_1fr_1fr_1fr] bg-gray-100 text-sm font-semibold px-4 py-3 rounded whitespace-nowrap">
            <span>Image</span>
            <span>Name</span>
            <span>Services</span>
            <span>Duration</span>
            <span>Price</span>
            <span>Status</span>
            <span className="text-center">Actions</span>
          </div>

          {/* ROWS */}
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="grid grid-cols-1 md:grid-cols-[80px_1.5fr_2fr_1fr_1fr_1fr_1fr] gap-2 md:gap-2 bg-white px-4 py-4 rounded-lg shadow items-start mb-4"
            >
              {/* IMAGE */}
              <div>
                {pkg.image ? (
                  <img
                    src={`${API_BASE_URL.replace("/api", "")}/${pkg.image}`}
                    className="w-14 h-14 rounded object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gray-200 rounded" />
                )}
              </div>

              {/* NAME */}
              <div className="font-semibold">{pkg.name}</div>

              {/* SERVICES */}
              <ul className="list-disc list-inside text-sm max-h-28 overflow-y-auto">
                {pkg.services.map((s) => (
                  <li key={s._id}>{s.name}</li>
                ))}
              </ul>

              {/* DURATION */}
              <div className="truncate">{pkg.totalDuration}</div>

              {/* PRICE */}
              <div className="font-medium truncate">{pkg.price}</div>

              {/* STATUS */}
              <div>
                <button
                  disabled={loadingId === pkg._id}
                  onClick={() => toggleStatus(pkg._id)}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    pkg.isActive
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
                >
                  {loadingId === pkg._id
                    ? "Updating..."
                    : pkg.isActive
                    ? "Active"
                    : "Inactive"}
                </button>
              </div>

              {/* ACTIONS */}
              <div className="flex md:justify-center gap-2">
                <FiEye
                  onClick={() => navigate(`/package-details/${pkg._id}`)}
                  className="cursor-pointer text-amber-600"
                />
                <FiEdit
                  onClick={() => navigate(`/update-package/${pkg._id}`)}
                  className="cursor-pointer text-blue-600"
                />
                <FiTrash2 className="cursor-pointer text-red-600" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden flex flex-col space-y-4">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col gap-3"
          >
            <div className="flex gap-3">
              {pkg.image ? (
                <img
                  src={`${API_BASE_URL.replace("/api", "")}/${pkg.image}`}
                  className="w-14 h-14 rounded object-cover"
                />
              ) : (
                <div className="w-14 h-14 bg-gray-200 rounded" />
              )}
              <div className="flex-1">
                <h3 className="font-semibold">{pkg.name}</h3>
                <p className="text-sm text-gray-500">{pkg.totalDuration} | {pkg.price}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-1">Services:</h4>
              <ul className="list-disc list-inside text-sm max-h-28 overflow-y-auto">
                {pkg.services.map((s) => (
                  <li key={s._id}>{s.name}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center">
              <button
                disabled={loadingId === pkg._id}
                onClick={() => toggleStatus(pkg._id)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  pkg.isActive
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
              >
                {loadingId === pkg._id
                  ? "Updating..."
                  : pkg.isActive
                  ? "Active"
                  : "Inactive"}
              </button>

              <div className="flex gap-2">
                <FiEye
                  onClick={() => navigate(`/package-details/${pkg._id}`)}
                  className="cursor-pointer text-amber-600"
                />
                <FiEdit
                  onClick={() => navigate(`/update-package/${pkg._id}`)}
                  className="cursor-pointer text-blue-600"
                />
                <FiTrash2 className="cursor-pointer text-red-600" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
