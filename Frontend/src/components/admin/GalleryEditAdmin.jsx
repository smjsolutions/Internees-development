import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function GalleryEditAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("inactive");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/gallery/${id}`);
        const img = res.data;
        setTitle(img.title || "");
        setCategory(img.category || "");
        setStatus(img.status || "inactive");
        setPreview(`http://localhost:5000/${img.image_url?.replace(/\\/g, "/")}`);
      } catch (err) {
        console.error(err);
        alert("Failed to load image");
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, [id]);

  const saveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("status", status);
      if (file) formData.append("image", file);

      await axios.put(`http://localhost:5000/api/gallery/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Redirect without showing alert
      navigate("/gallery-admin");
    } catch (err) {
      console.error(err);
      alert("Failed to update image");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Gallery Image</h2>

      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-2 py-1 rounded w-full mb-3"
      />

      <label>Category</label>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-2 py-1 rounded w-full mb-3"
      />

      <label>Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border px-2 py-1 rounded w-full mb-3"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <label>Change Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }}
        className="border px-2 py-1 rounded w-full mb-3"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-48 object-cover rounded mb-3"
        />
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => navigate("/gallery-admin")}
          className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={saveEdit}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}
