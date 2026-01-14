import React, { useState } from "react";
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Get token from URL
  const token = window.location.pathname.split("/").pop();

  const passwordRequirements = [
    { id: 1, text: "At least 8 characters", regex: /.{8,}/ },
    { id: 2, text: "One uppercase letter", regex: /[A-Z]/ },
    { id: 3, text: "One lowercase letter", regex: /[a-z]/ },
    { id: 4, text: "One number", regex: /\d/ },
    { id: 5, text: "One special character", regex: /[@$!%*?&]/ },
  ];

  const validateForm = () => {
    const newErrors = {};
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
        }/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: formData.password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (error) {
      setErrors({ form: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
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
        <div className="text-center mb-8">
          {/* <div
            className="inline-block p-1 rounded-full mb-4"
            style={{
              background: "linear-gradient(135deg, #BB8C4B 0%, #BB8C4B 100%)",
            }}
          >
            <div
              className="rounded-full p-4"
              style={{ backgroundColor: "#222227" }}
            >
              <div className="text-4xl">💎</div>
            </div>
          </div> */}
          <h1
            className="text-3xl md:text-4xl font-bold mb-2"
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
          className="rounded-2xl shadow-2xl overflow-hidden"
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
              className="text-2xl font-bold mb-2"
              style={{ color: "#FFFFFF" }}
            >
              Reset Password
            </h2>
            <p className="text-sm mb-6" style={{ color: "#999999" }}>
              Enter your new password
            </p>

            {errors.form && (
              <div
                className="mb-4 p-3 rounded-lg flex items-start gap-2"
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  borderWidth: "1px",
                  borderColor: "#ef4444",
                }}
              >
                <AlertCircle
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: "#ef4444" }}
                />
                <p className="text-sm" style={{ color: "#ef4444" }}>
                  {errors.form}
                </p>
              </div>
            )}

            {success && (
              <div
                className="mb-4 p-3 rounded-lg flex items-start gap-2"
                style={{
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  borderWidth: "1px",
                  borderColor: "#22c55e",
                }}
              >
                <CheckCircle
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: "#22c55e" }}
                />
                <p className="text-sm" style={{ color: "#22c55e" }}>
                  Password reset successful! Redirecting to login...
                </p>
              </div>
            )}

            <div className="space-y-4">
              {/* New Password */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#DDDDDD" }}
                >
                  New Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    style={{ color: "#777777" }}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading || success}
                    className="w-full rounded-lg py-3 px-12 focus:outline-none"
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
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
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
                  <p className="text-xs mt-1" style={{ color: "#ef4444" }}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#DDDDDD" }}
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    style={{ color: "#777777" }}
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading || success}
                    className="w-full rounded-lg py-3 px-12 focus:outline-none"
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
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
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
                  <p className="text-xs mt-1" style={{ color: "#ef4444" }}>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || success}
                className="w-full font-bold py-3 rounded-lg transition-all duration-300"
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
                  ? "Resetting..."
                  : success
                  ? "Success!"
                  : "Reset Password"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
