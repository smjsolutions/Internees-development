import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/SidebarAdmin";
import Topbar from "../../components/admin/TopbarAdmin";
import ServicesTableAdmin from "../../components/admin/ServiceTableAdmin";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AllServicesAdmin() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1">
        <Topbar />

       

          <ServicesTableAdmin services={services} />
     
      </main>
    </div>
  );
}
