import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/admin/SidebarAdmin";
import Topbar from "../../components/admin/TopbarAdmin";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams(); // user ID from URL
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [status, setStatus] = useState("ACTIVE");

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { data } = await axios.get(`${API_BASE_URL}/api/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setName(data.user.name);
        setUsername(data.user.username);
        setEmail(data.user.email);
        setRole(data.user.role);
        setStatus(data.user.status);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user details");
      } finally {
        setFetching(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !role || !status) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(
        `${API_BASE_URL}/api/admin/users/${id}`,
        { name, username, role, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("User updated successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading user details...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <Topbar setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-auto">
          <section className="max-w-3xl mx-auto w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center text-gray-800">
              Edit User
            </h2>

            {error && (
              <p className="text-red-600 mb-4 text-center font-medium">{error}</p>
            )}

            <form
              onSubmit={handleUpdate}
              className="space-y-4 sm:space-y-6 md:space-y-8 bg-white p-6 sm:p-8 rounded-lg shadow w-full"
            >
              {/* Name */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 p-2 sm:p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 p-2 sm:p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Email (readonly) */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full border border-gray-300 p-2 sm:p-3 rounded bg-gray-100"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-gray-300 p-2 sm:p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="MANAGER">MANAGER</option>
                  <option value="INVENTORY_MANAGER">INVENTORY MANAGER</option>
                  <option value="RECEPTIONIST">RECEPTIONIST</option>
                  <option value="STAFF">STAFF</option>
                  <option value="CUSTOMER">CUSTOMER</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-gray-300 p-2 sm:p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
                >
                  {loading ? "Updating..." : "Update User"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="w-full sm:w-auto bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
