import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaCalendarAlt, FaClock, FaTag, FaDollarSign } from "react-icons/fa";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, confirmed, completed, cancelled

  useEffect(() => {
    fetchAppointments();
  }, [filter]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("accessToken");
      const params = filter !== "all" ? { status: filter } : {};

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/appointments/my-appointments`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params,
        },
      );

      if (response.data.success) {
        setAppointments(response.data.appointments);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (appointmentId, appointmentDate) => {
    // Check if appointment is in the future
    const apptDate = new Date(appointmentDate);
    const now = new Date();

    if (apptDate < now) {
      toast.error("Cannot cancel past appointments");
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("accessToken");
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/appointments/${appointmentId}/cancel`,
        { cancellationReason: "Cancelled by customer" },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        toast.success("Appointment cancelled successfully");
        fetchAppointments(); // Refresh list
      }
    } catch (error) {
      console.error("Cancel error:", error);
      toast.error(
        error.response?.data?.message || "Failed to cancel appointment",
      );
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Pending",
      },
      confirmed: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Confirmed",
      },
      completed: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "Completed",
      },
      cancelled: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#BB8C4B] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-[120px]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          My Appointments
        </h1>
        <p className="mt-2 text-gray-600">
          View and manage your upcoming and past appointments
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {["all", "pending", "confirmed", "completed", "cancelled"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 font-medium capitalize transition-all ${
                  filter === status
                    ? "border-b-2 border-[#BB8C4B] text-[#BB8C4B]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {status}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Appointments List */}
      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No appointments found
          </h3>
          <p className="text-gray-600">
            {filter === "all"
              ? "You haven't booked any appointments yet"
              : `No ${filter} appointments`}
          </p>
          <a
            href="/services"
            className="mt-6 inline-block bg-[#BB8C4B] text-white px-6 py-3 rounded hover:bg-[#A97C42] transition"
          >
            Browse Services
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-[#BB8C4B] to-[#D79A4A] p-4 text-white">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">
                    {appointment.service.name}
                  </h3>
                  {getStatusBadge(appointment.status)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3">
                {/* Date */}
                <div className="flex items-center gap-3 text-gray-700">
                  <FaCalendarAlt className="text-[#BB8C4B]" />
                  <span>{formatDate(appointment.appointmentDate)}</span>
                </div>

                {/* Time */}
                <div className="flex items-center gap-3 text-gray-700">
                  <FaClock className="text-[#BB8C4B]" />
                  <span>{formatTime(appointment.appointmentTime)}</span>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-3 text-gray-700">
                  <FaTag className="text-[#BB8C4B]" />
                  <span>{appointment.duration} minutes</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 text-gray-700">
                  <FaDollarSign className="text-[#BB8C4B]" />
                  <span>Rs. {appointment.price}</span>
                </div>

                {/* Staff (if assigned) */}
                {appointment.staff && (
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Staff:</span>{" "}
                      {appointment.staff.name}
                    </p>
                  </div>
                )}

                {/* Notes */}
                {appointment.notes && (
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Notes:</span>{" "}
                      {appointment.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              {appointment.status !== "cancelled" &&
                appointment.status !== "completed" && (
                  <div className="px-4 pb-4 flex gap-2">
                    <button
                      onClick={() =>
                        handleCancel(
                          appointment._id,
                          appointment.appointmentDate,
                        )
                      }
                      className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition text-sm font-medium"
                    >
                      Cancel
                    </button>
                    {/* Optional: Add Reschedule button here */}
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
