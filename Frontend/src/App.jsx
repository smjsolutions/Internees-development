import { Routes, Route } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import ServicesAdmin from "./pages/admin/AllServicesAdmin";
import CreateService from "./pages/admin/CreateService";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/services-admin" element={<ServicesAdmin />} />
      <Route path="/create-service" element={<CreateService />} />
    </Routes>
  );
}
