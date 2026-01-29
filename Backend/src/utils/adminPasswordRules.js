const adminValidatePasswordRules = (password) => {
  if (!password || typeof password !== "string") return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[a-z]/.test(password)) return "Password must contain lowercase letter";
  if (!/[A-Z]/.test(password)) return "Password must contain uppercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain number";
  if (!/[^A-Za-z0-9]/.test(password))
    return "Password must contain special character";
  return null;
};

module.exports = { adminValidatePasswordRules };
