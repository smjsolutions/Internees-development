import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Check for OAuth callback tokens
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");
    const error = urlParams.get("error");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      window.location.href = "/dashboard";
    }

    if (error) {
      setErrors({ form: "Social authentication failed. Please try again." });
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (errors.form) {
      setErrors((prev) => ({ ...prev, form: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000/api"
        }/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store tokens
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // Store user data
      localStorage.setItem("user", JSON.stringify(data.user));

      // Show success and redirect
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      setErrors({ form: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    window.location.href = `${apiUrl}/auth/${provider}`;
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{
        background: "linear-gradient(135deg, #222227 0%, #303133 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(187, 140, 75, 0.1) 35px, rgba(187, 140, 75, 0.1) 70px)",
          }}
        ></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          {/* <div
            className="inline-block p-1 mb-4 rounded-full"
            style={{
              background: "linear-gradient(135deg, #BB8C4B 0%, #BB8C4B 100%)",
            }}
          >
            <div
              className="p-4 rounded-full"
              style={{ backgroundColor: "#222227" }}
            >
              <div className="text-4xl">💎</div>
            </div>
          </div> */}
          <h1
            className="mb-2 text-3xl font-bold md:text-4xl"
            style={{
              background: "linear-gradient(135deg, #BB8C4B 0%, #DDDDDD 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Diamond Trim
          </h1>
          <p className="text-sm" style={{ color: "#999999" }}>
            Beauty Studio
          </p>
        </div>

        <div
          className="overflow-hidden shadow-2xl rounded-2xl"
          style={{
            backgroundColor: "#303133",
            borderWidth: "1px",
            borderColor: "rgba(187, 140, 75, 0.2)",
          }}
        >
          <div
            className="h-1"
            style={{
              background:
                "linear-gradient(90deg, #BB8C4B 0%, #DDDDDD 50%, #BB8C4B 100%)",
            }}
          ></div>

          <div className="p-8">
            <h2
              className="mb-2 text-2xl font-bold"
              style={{ color: "#FFFFFF" }}
            >
              Welcome Back
            </h2>
            <p className="mb-6 text-sm" style={{ color: "#999999" }}>
              Sign in to your account
            </p>

            {/* Error Message */}
            {errors.form && (
              <div
                className="flex items-start gap-2 p-3 mb-4 rounded-lg"
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  borderWidth: "1px",
                  borderColor: "#ef4444",
                }}
              >
                <AlertCircle
                  className="flex-shrink-0 w-5 h-5"
                  style={{ color: "#ef4444" }}
                />
                <p className="text-sm" style={{ color: "#ef4444" }}>
                  {errors.form}
                </p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div
                className="flex items-start gap-2 p-3 mb-4 rounded-lg"
                style={{
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  borderWidth: "1px",
                  borderColor: "#22c55e",
                }}
              >
                <div
                  className="flex-shrink-0 w-5 h-5"
                  style={{ color: "#22c55e" }}
                >
                  ✓
                </div>
                <p className="text-sm" style={{ color: "#22c55e" }}>
                  {successMessage}
                </p>
              </div>
            )}

            <div className="space-y-5">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                  style={{ color: "#DDDDDD" }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2"
                    style={{ color: "#777777" }}
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-12 py-3 transition-colors rounded-lg focus:outline-none"
                    style={{
                      backgroundColor: "#222227",
                      borderWidth: "1px",
                      borderColor: errors.email ? "#ef4444" : "#777777",
                      color: "#FFFFFF",
                      opacity: loading ? 0.6 : 1,
                    }}
                    placeholder="your@email.com"
                    onFocus={(e) =>
                      !errors.email && (e.target.style.borderColor = "#BB8C4B")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.email
                        ? "#ef4444"
                        : "#777777")
                    }
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs" style={{ color: "#ef4444" }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                  style={{ color: "#DDDDDD" }}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2"
                    style={{ color: "#777777" }}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-12 py-3 transition-colors rounded-lg focus:outline-none"
                    style={{
                      backgroundColor: "#222227",
                      borderWidth: "1px",
                      borderColor: errors.password ? "#ef4444" : "#777777",
                      color: "#FFFFFF",
                      opacity: loading ? 0.6 : 1,
                    }}
                    placeholder="••••••••"
                    onFocus={(e) =>
                      !errors.password &&
                      (e.target.style.borderColor = "#BB8C4B")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.password
                        ? "#ef4444"
                        : "#777777")
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="absolute transition-colors transform -translate-y-1/2 right-3 top-1/2"
                    style={{ color: "#777777" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#BB8C4B")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#777777")
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs" style={{ color: "#ef4444" }}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-4 h-4 rounded cursor-pointer focus:ring-2"
                    style={{
                      accentColor: "#BB8C4B",
                      backgroundColor: "#222227",
                      borderColor: "#777777",
                    }}
                  />
                  <span className="ml-2 text-sm" style={{ color: "#999999" }}>
                    Remember me
                  </span>
                </label>
                <a
                  href="#forgot"
                  className="text-sm transition-colors"
                  style={{ color: "#BB8C4B" }}
                  onMouseEnter={(e) => (e.target.style.color = "#DDDDDD")}
                  onMouseLeave={(e) => (e.target.style.color = "#BB8C4B")}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/forgot-password";
                  }}
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] relative"
                style={{
                  background: loading
                    ? "#777777"
                    : "linear-gradient(135deg, #BB8C4B 0%, #DDDDDD 100%)",
                  color: "#222227",
                  boxShadow: "0 10px 25px rgba(187, 140, 75, 0.2)",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) =>
                  !loading &&
                  (e.target.style.background =
                    "linear-gradient(135deg, #DDDDDD 0%, #BB8C4B 100%)")
                }
                onMouseLeave={(e) =>
                  !loading &&
                  (e.target.style.background =
                    "linear-gradient(135deg, #BB8C4B 0%, #DDDDDD 100%)")
                }
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div
                      className="w-5 h-5 border-2 rounded-full border-t-transparent animate-spin"
                      style={{
                        borderColor: "#222227",
                        borderTopColor: "transparent",
                      }}
                    ></div>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div
                  className="w-full"
                  style={{ borderTopWidth: "1px", borderColor: "#777777" }}
                ></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className="px-4 text-sm"
                  style={{ backgroundColor: "#303133", color: "#999999" }}
                >
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin("google")}
                disabled={loading}
                className="flex items-center justify-center gap-2 py-3 transition-all duration-300 rounded-lg"
                style={{
                  backgroundColor: "#222227",
                  borderWidth: "1px",
                  borderColor: "#777777",
                  color: "#FFFFFF",
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = "#303133";
                    e.currentTarget.style.borderColor = "#BB8C4B";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = "#222227";
                    e.currentTarget.style.borderColor = "#777777";
                  }
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin("facebook")}
                disabled={loading}
                className="flex items-center justify-center gap-2 py-3 transition-all duration-300 rounded-lg"
                style={{
                  backgroundColor: "#222227",
                  borderWidth: "1px",
                  borderColor: "#777777",
                  color: "#FFFFFF",
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = "#303133";
                    e.currentTarget.style.borderColor = "#BB8C4B";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = "#222227";
                    e.currentTarget.style.borderColor = "#777777";
                  }
                }}
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="text-sm font-medium">Facebook</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm" style={{ color: "#999999" }}>
                Don't have an account?{" "}
                <a
                  href="#register"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/register";
                  }}
                  className="font-medium transition-colors"
                  style={{ color: "#BB8C4B" }}
                  onMouseEnter={(e) => (e.target.style.color = "#DDDDDD")}
                  onMouseLeave={(e) => (e.target.style.color = "#BB8C4B")}
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-xs text-center" style={{ color: "#777777" }}>
          <p>© 2025 Diamond Trim Beauty Studio. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
