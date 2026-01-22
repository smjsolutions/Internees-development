import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddGalleryImage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("active");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("status", status);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/gallery", formData);
      navigate("/gallery-admin");
      setTitle("");
      setCategory("");
      setStatus("active");
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Add New Gallery Image</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#BB8C4B]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#BB8C4B]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <select
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#BB8C4B]"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full text-gray-700"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-full h-48 sm:h-64 object-cover rounded"
            />
          )}
          <button
            type="submit"
            className="w-full bg-[#BB8C4B] text-white px-4 py-2 rounded hover:bg-[#a3763e] transition-colors duration-200"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
