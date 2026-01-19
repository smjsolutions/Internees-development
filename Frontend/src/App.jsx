import { Routes, Route } from "react-router-dom";

import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";

// Services Admin
import ServicesAdmin from "./pages/admin/AllServicesAdmin";
import CreateService from "./pages/admin/CreateService";
import UpdateService from "./pages/admin/UpdateService";
import ServiceDetailsAdmin from "./pages/admin/ServiceDetail"; // ✅ Import Service Details

// Packages Admin
import AllPackagesAdmin from "./pages/admin/AllPackages";
import CreatePackage from "./pages/admin/CreatePackage";
import UpdatePackage from "./pages/admin/UpdatePackage";
import PackageDetails from "./pages/admin/PackageDetail";


// User-facing Services
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ServicePage from "./pages/ServicePage";
import ServicesDetailPage from "./pages/ServicesDetailPage";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin Dashboard */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Services Admin */}
      <Route path="/services-admin" element={<ServicesAdmin />} />
      <Route path="/create-service" element={<CreateService />} />
      <Route path="/update-service/:id" element={<UpdateService />} />
      <Route path="/service-details/:id" element={<ServiceDetailsAdmin />} /> {/* ✅ Added */}

      {/* Packages Admin */}
      <Route path="/packages-admin" element={<AllPackagesAdmin />} />
      <Route path="/create-package" element={<CreatePackage />} />
      <Route path="/update-package/:id" element={<UpdatePackage />} />
      <Route path="/package-details/:id" element={<PackageDetails />} />

          <Route path="/services" element={<ServicePage />} />
      <Route path="/services" element={<ServicePage />} />
      <Route path="/servicedetail/:id" element={<ServicesDetailPage />} />
      <Route path="/update-service/:id" element={<UpdateService />} />
    </Routes>
  );
}
