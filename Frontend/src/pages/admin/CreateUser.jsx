import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/SidebarAdmin";
import Topbar from "../../components/admin/TopbarAdmin";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CreateUser() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("Admin not logged in");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, username, email, role, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create user");
        setLoading(false);
        return;
      }

      alert("User created successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

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
              Create New User
            </h2>

            {error && (
              <p className="text-red-600 mb-4 text-center font-medium">{error}</p>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-6 md:space-y-8 bg-white p-6 sm:p-8 rounded-lg shadow w-full"
            >
              {/* Name */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 p-2 sm:p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Username */}
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

              {/* Email */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 p-2 sm:p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Role */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-gray-300 p-2 sm:p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="MANAGER">MANAGER</option>
                  <option value="INVENTORY_MANAGER">INVENTORY MANAGER</option>
                  <option value="RECEPTIONIST">RECEPTIONIST</option>
                  <option value="STAFF">STAFF</option>
                  <option value="CUSTOMER">CUSTOMER</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 p-2 sm:p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 p-2 sm:p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
                >
                  {loading ? "Creating..." : "Create User"}
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
