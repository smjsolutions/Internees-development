import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function AddGalleryImage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("active");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate(); // Initialize navigate

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
      
      // Redirect to the gallery admin page after successful upload
      navigate("/gallery-admin"); 

      // Optional: reset form if you want
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
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Gallery Image</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full border px-3 py-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <select
          className="w-full border px-3 py-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <input type="file" onChange={handleImageChange} accept="image/*" />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-2 w-48 h-48 object-cover rounded"
          />
        )}
        <button
          type="submit"
          className="bg-[#BB8C4B] text-white px-4 py-2 rounded hover:bg-[#a3763e]"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
