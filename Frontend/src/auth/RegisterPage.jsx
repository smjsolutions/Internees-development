import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordRequirements = [
    { id: 1, text: "At least 8 characters", regex: /.{8,}/ },
    { id: 2, text: "One uppercase letter", regex: /[A-Z]/ },
    { id: 3, text: "One lowercase letter", regex: /[a-z]/ },
    { id: 4, text: "One number", regex: /\d/ },
    { id: 5, text: "One special character", regex: /[@$!%*?&]/ },
  ];

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (formData.username && formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!strongPasswordRegex.test(formData.password)) {
      newErrors.password = "Password does not meet requirements";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
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
        }/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            username: formData.username || undefined,
            email: formData.email,
            phone: formData.phone || undefined,
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const fieldErrors = {};
          data.errors.forEach((err) => {
            fieldErrors[err.param] = err.msg;
          });
          setErrors(fieldErrors);
        } else {
          throw new Error(data.message || "Registration failed");
        }
        return;
      }

      setSuccess(true);

      // OPTIONAL: store tokens only if backend sends them after verification
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      setTimeout(() => {
        window.location.href = `/verify-email?email=${encodeURIComponent(
          formData.email,
        )}`;
      }, 1500);
    } catch (error) {
      setErrors({ form: error.message });
    } finally {
      setLoading(false);
    }
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
              Create Account
            </h2>
            <p className="mb-6 text-sm" style={{ color: "#999999" }}>
              Join Diamond Trim Beauty Studio
            </p>

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

            {success && (
              <div
                className="flex items-start gap-2 p-3 mb-4 rounded-lg"
                style={{
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  borderWidth: "1px",
                  borderColor: "#22c55e",
                }}
              >
                <CheckCircle
                  className="flex-shrink-0 w-5 h-5"
                  style={{ color: "#22c55e" }}
                />
                <p className="text-sm" style={{ color: "#22c55e" }}>
                  Registration successful! Check your email for verification.
                </p>
              </div>
            )}

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  style={{ color: "#DDDDDD" }}
                >
                  Full Name *
                </label>
                <div className="relative">
                  <User
                    className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2"
                    style={{ color: "#777777" }}
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-12 py-3 transition-colors rounded-lg focus:outline-none"
                    style={{
                      backgroundColor: "#222227",
                      borderWidth: "1px",
                      borderColor: errors.name ? "#ef4444" : "#777777",
                      color: "#FFFFFF",
                    }}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs" style={{ color: "#ef4444" }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Username (Optional) */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  style={{ color: "#DDDDDD" }}
                >
                  Username (optional)
                </label>
                <div className="relative">
                  <User
                    className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2"
                    style={{ color: "#777777" }}
                  />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-12 py-3 rounded-lg focus:outline-none"
                    style={{
                      backgroundColor: "#222227",
                      borderWidth: "1px",
                      borderColor: errors.username ? "#ef4444" : "#777777",
                      color: "#FFFFFF",
                    }}
                    placeholder="johndoe"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-xs" style={{ color: "#ef4444" }}>
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  style={{ color: "#DDDDDD" }}
                >
                  Email Address *
                </label>
                <div className="relative">
                  <Mail
                    className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2"
                    style={{ color: "#777777" }}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-12 py-3 rounded-lg focus:outline-none"
                    style={{
                      backgroundColor: "#222227",
                      borderWidth: "1px",
                      borderColor: errors.email ? "#ef4444" : "#777777",
                      color: "#FFFFFF",
                    }}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs" style={{ color: "#ef4444" }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone (Optional) */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  style={{ color: "#DDDDDD" }}
                >
                  Phone (optional)
                </label>
                <div className="relative">
                  <Phone
                    className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2"
                    style={{ color: "#777777" }}
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-12 py-3 rounded-lg focus:outline-none"
                    style={{
                      backgroundColor: "#222227",
                      borderWidth: "1px",
                      borderColor: "#777777",
                      color: "#FFFFFF",
                    }}
                    placeholder="+92 300 1234567"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  style={{ color: "#DDDDDD" }}
                >
                  Password *
                </label>
                <div className="relative">
                  <Lock
                    className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2"
                    style={{ color: "#777777" }}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-12 py-3 rounded-lg focus:outline-none"
                    style={{
                      backgroundColor: "#222227",
                      borderWidth: "1px",
                      borderColor: errors.password ? "#ef4444" : "#777777",
                      color: "#FFFFFF",
                    }}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute transform -translate-y-1/2 right-3 top-1/2"
                    style={{ color: "#777777" }}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((req) => (
                    <div key={req.id} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: req.regex.test(formData.password)
                            ? "#22c55e"
                            : "#777777",
                        }}
                      ></div>
                      <span
                        className="text-xs"
                        style={{
                          color: req.regex.test(formData.password)
                            ? "#22c55e"
                            : "#999999",
                        }}
                      >
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs" style={{ color: "#ef4444" }}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  style={{ color: "#DDDDDD" }}
                >
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock
                    className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2"
                    style={{ color: "#777777" }}
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-12 py-3 rounded-lg focus:outline-none"
                    style={{
                      backgroundColor: "#222227",
                      borderWidth: "1px",
                      borderColor: errors.confirmPassword
                        ? "#ef4444"
                        : "#777777",
                      color: "#FFFFFF",
                    }}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute transform -translate-y-1/2 right-3 top-1/2"
                    style={{ color: "#777777" }}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs" style={{ color: "#ef4444" }}>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || success}
                className="w-full py-3 font-bold transition-all duration-300 rounded-lg"
                style={{
                  background:
                    loading || success
                      ? "#777777"
                      : "linear-gradient(135deg, #BB8C4B 0%, #DDDDDD 100%)",
                  color: "#222227",
                  cursor: loading || success ? "not-allowed" : "pointer",
                }}
              >
                {loading
                  ? "Creating Account..."
                  : success
                    ? "Redirecting..."
                    : "Create Account"}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm" style={{ color: "#999999" }}>
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium"
                  style={{ color: "#BB8C4B" }}
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
