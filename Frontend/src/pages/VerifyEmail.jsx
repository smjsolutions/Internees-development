import React, { useState, useEffect } from "react";
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    // Get email from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }

    setError("");
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/auth/verify-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: otpCode }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Verification failed");
        setLoading(false);
        return;
      }

      // Store tokens
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/auth/resend-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to resend code");
        return;
      }

      alert("New verification code sent to your email");
      setOtp(["", "", "", "", "", ""]);
      document.getElementById("otp-0")?.focus();
    } catch (err) {
      setError(err.message);
    } finally {
      setResending(false);
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
            <button
              onClick={() => (window.location.href = "/login")}
              className="flex items-center gap-2 mb-6 transition-colors"
              style={{ color: "#BB8C4B" }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Login</span>
            </button>

            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "#FFFFFF" }}
            >
              Verify Your Email
            </h2>
            <p className="text-sm mb-6" style={{ color: "#999999" }}>
              Enter the 6-digit code sent to{" "}
              <strong style={{ color: "#DDDDDD" }}>{email}</strong>
            </p>

            {error && (
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
                  {error}
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
                  Email verified! Redirecting...
                </p>
              </div>
            )}

            <div className="flex gap-2 justify-center mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={loading || success}
                  className="w-12 h-14 text-center text-2xl font-bold rounded-lg focus:outline-none"
                  style={{
                    backgroundColor: "#222227",
                    borderWidth: "2px",
                    borderColor: digit ? "#BB8C4B" : "#777777",
                    color: "#FFFFFF",
                  }}
                />
              ))}
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
                ? "Verifying..."
                : success
                  ? "Verified!"
                  : "Verify Email"}
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm mb-2" style={{ color: "#999999" }}>
                Didn't receive the code?
              </p>
              <button
                onClick={handleResend}
                disabled={resending}
                className="text-sm font-medium"
                style={{ color: "#BB8C4B" }}
              >
                {resending ? "Sending..." : "Resend Code"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
