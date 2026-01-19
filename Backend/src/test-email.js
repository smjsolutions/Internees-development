require("dotenv").config();
const sendEmail = require("./utils/sendEmail");

const testEmail = async () => {
  try {
    console.log("🔄 Testing email configuration...");
    console.log("Email Host:", process.env.EMAIL_HOST);
    console.log("Email User:", process.env.EMAIL_USER);
    console.log("Email From:", process.env.EMAIL_FROM);

    await sendEmail({
      to: process.env.EMAIL_USER, // Send to yourself
      subject: "Test Email - Diamond Trim",
      html: `
        <h2>Test Email</h2>
        <p>If you receive this, your email configuration is working correctly!</p>
        <p>Timestamp: ${new Date().toLocaleString()}</p>
      `,
    });

    console.log("✅ Test email sent successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Test email failed:", error.message);
    process.exit(1);
  }
};

testEmail();
