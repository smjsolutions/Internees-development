import React, { useState } from "react";
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000/api"
        }/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset email");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
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
            <button
              onClick={() => (window.location.href = "/login")}
              className="flex items-center gap-2 mb-6 transition-colors"
              style={{ color: "#BB8C4B" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#DDDDDD")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#BB8C4B")}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Login</span>
            </button>

            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "#FFFFFF" }}
            >
              Forgot Password?
            </h2>
            <p className="text-sm mb-6" style={{ color: "#999999" }}>
              {success
                ? "Check your email for reset instructions"
                : "Enter your email to receive password reset instructions"}
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

            {success ? (
              <div className="space-y-4">
                <div
                  className="p-4 rounded-lg flex items-start gap-3"
                  style={{
                    backgroundColor: "rgba(34, 197, 94, 0.1)",
                    borderWidth: "1px",
                    borderColor: "#22c55e",
                  }}
                >
                  <CheckCircle
                    className="w-6 h-6 flex-shrink-0 mt-0.5"
                    style={{ color: "#22c55e" }}
                  />
                  <div>
                    <p
                      className="text-sm font-medium mb-1"
                      style={{ color: "#22c55e" }}
                    >
                      Email Sent Successfully!
                    </p>
                    <p className="text-xs" style={{ color: "#999999" }}>
                      We've sent password reset instructions to{" "}
                      <strong style={{ color: "#DDDDDD" }}>{email}</strong>. The
                      link will expire in 10 minutes.
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm mb-4" style={{ color: "#999999" }}>
                    Didn't receive the email?
                  </p>
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setEmail("");
                    }}
                    className="text-sm font-medium transition-colors"
                    style={{ color: "#BB8C4B" }}
                    onMouseEnter={(e) => (e.target.style.color = "#DDDDDD")}
                    onMouseLeave={(e) => (e.target.style.color = "#BB8C4B")}
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#DDDDDD" }}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                      style={{ color: "#777777" }}
                    />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      disabled={loading}
                      className="w-full rounded-lg py-3 px-12 focus:outline-none transition-colors"
                      style={{
                        backgroundColor: "#222227",
                        borderWidth: "1px",
                        borderColor: error ? "#ef4444" : "#777777",
                        color: "#FFFFFF",
                        opacity: loading ? 0.6 : 1,
                      }}
                      placeholder="your@email.com"
                      onFocus={(e) =>
                        !error && (e.target.style.borderColor = "#BB8C4B")
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = error
                          ? "#ef4444"
                          : "#777777")
                      }
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
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
                        className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
                        style={{
                          borderColor: "#222227",
                          borderTopColor: "transparent",
                        }}
                      ></div>
                      Sending...
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-6 text-xs" style={{ color: "#777777" }}>
          <p>© 2025 Diamond Trim Beauty Studio. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
