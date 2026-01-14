import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import ServicesAdmin from "./pages/admin/AllServicesAdmin";
import CreateService from "./pages/admin/CreateService";
import UpdateService from "./pages/admin/UpdateService";
import ServicePage from "./pages/ServicePage";
import ServicesDetailPage from "./pages/ServicesDetailPage";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Routes / Page Content */}
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/services-admin" element={<ServicesAdmin />} />
          <Route path="/create-service" element={<CreateService />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/servicedetail/:id" element={<ServicesDetailPage />} />
          <Route path="/update-service/:id" element={<UpdateService />} />
        </Routes>
      </main>

      {/* Sticky Footer */}
      <Footer />
    </div>
  );
}
