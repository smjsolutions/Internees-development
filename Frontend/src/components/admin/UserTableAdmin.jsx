import { FiEdit, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ROLES = [
  "ALL",
  "ADMIN",
  "MANAGER",
  "INVENTORY_MANAGER",
  "RECEPTIONIST",
  "STAFF",
  "CUSTOMER",
];

export default function UsersTableAdmin({ users, refreshUsers }) {
  const navigate = useNavigate();

  const [activeRole, setActiveRole] = useState("ALL");
  const [search, setSearch] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteUserName, setDeleteUserName] = useState("");

  const applyFilters = (roleValue, searchValue) => {
    const filters = {};
    if (roleValue && roleValue !== "ALL") filters.role = roleValue;
    if (searchValue?.trim()) filters.search = searchValue.trim();
    refreshUsers(filters);
  };

  const handleRoleClick = (role) => {
    setActiveRole(role);
    applyFilters(role, search);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    applyFilters(activeRole, value);
  };

  const openDeleteModal = (id, name) => {
    setDeleteUserId(id);
    setDeleteUserName(name);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteUserId(null);
    setDeleteUserName("");
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${API_BASE_URL}/api/admin/users/${deleteUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      closeDeleteModal();
      refreshUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-lg font-semibold">Users</h2>
        <button
          onClick={() => navigate("/create-user")}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-fit"
        >
          <FiPlus size={16} />
          Create User
        </button>
      </div>

      {/* ROLE FILTERS */}
      <div className="flex flex-wrap gap-2">
        {ROLES.map((role) => (
          <button
            key={role}
            onClick={() => handleRoleClick(role)}
            className={`px-3 py-1.5 rounded text-sm border transition ${
              activeRole === role
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* SEARCH */}
      <div className="relative w-full md:w-72">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={handleSearch}
          placeholder="Search by name or email"
          className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* USERS TABLE */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-[2fr_2fr_1fr_1fr_90px] bg-gray-100 text-gray-700 font-semibold text-sm px-3 py-3 gap-3">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
          <span className="text-center">Actions</span>
        </div>

        {/* User rows */}
        {users.length === 0 ? (
          <p className="p-6 text-center text-gray-500">No users found</p>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_1fr_90px] px-3 py-4 gap-3 items-center border-t text-sm hover:bg-gray-50"
            >
              <div className="flex flex-col md:block">
                <span className="font-medium md:hidden">Name:</span>
                {user.name}
              </div>
              <div className="flex flex-col md:block">
                <span className="font-medium md:hidden">Email:</span>
                {user.email}
              </div>
              <div className="flex flex-col md:block">
                <span className="font-medium md:hidden">Role:</span>
                {user.role}
              </div>
              <div className="flex flex-col md:block">
                <span className="font-medium md:hidden">Status:</span>
                {user.status}
              </div>
              <div className="flex justify-start md:justify-center gap-2">
                <button
                  onClick={() => navigate(`/edit-user/${user._id}`)}
                  className="p-1.5 rounded-full hover:bg-blue-100 text-blue-600"
                >
                  <FiEdit size={14} />
                </button>
                <button
                  onClick={() => openDeleteModal(user._id, user.name)}
                  className="p-1.5 rounded-full hover:bg-red-100 text-red-600"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Delete <b>{deleteUserName}</b>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white"
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
