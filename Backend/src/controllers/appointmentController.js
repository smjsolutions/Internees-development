const Appointment = require("../models/Appointment");
const Service = require("../models/Service");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

/* =========================================
   GET ALL SERVICES
========================================= */
exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find({
      isActive: true,
      availableForBooking: true,
    }).sort({ category: 1, name: 1 });

    res.json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================================
   GET AVAILABLE SLOTS
========================================= */
exports.getAvailableSlots = async (req, res, next) => {
  try {
    const { date } = req.params;
    const { serviceId } = req.query;

    // Validate service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Get all appointments for the date
    const appointments = await Appointment.find({
      appointmentDate: new Date(date),
      status: { $nin: ["cancelled"] },
    });

    // Generate all possible slots (9 AM to 9 PM, 30-minute intervals)
    const workingHours = { start: 9, end: 21 };
    const allSlots = [];

    for (let hour = workingHours.start; hour < workingHours.end; hour++) {
      for (let minute of [0, 30]) {
        allSlots.push(
          `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`,
        );
      }
    }

    // Filter out booked slots
    const bookedSlots = appointments.map((apt) => apt.appointmentTime);
    const availableSlots = allSlots.filter(
      (slot) => !bookedSlots.includes(slot),
    );

    res.json({
      success: true,
      date,
      availableSlots,
      bookedSlots,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================================
   CREATE APPOINTMENT (AUTH + GUEST)
========================================= */
exports.createAppointment = async (req, res, next) => {
  try {
    const {
      serviceId,
      appointmentDate,
      appointmentTime,
      customerName,
      customerEmail,
      customerPhone,
      notes,
    } = req.body;

    console.log("📥 Received booking request:", {
      body: req.body,
      serviceId,
      date: appointmentDate,
      time: appointmentTime,
      phone: customerPhone,
    });

    const isAuthenticated = req.user && req.user._id;
    console.log("🔐 Authentication:", {
      isAuthenticated,
      userId: req.user?._id,
    });

    // Validation
    const errors = {};

    if (!serviceId) {
      console.log("❌ Missing serviceId");
      errors.serviceId = "Service is required";
    }
    if (!appointmentDate) {
      console.log("❌ Missing appointmentDate");
      errors.appointmentDate = "Date is required";
    }
    if (!appointmentTime) {
      console.log("❌ Missing appointmentTime");
      errors.appointmentTime = "Time is required";
    }

    if (!isAuthenticated) {
      if (!customerName?.trim()) {
        console.log("❌ Missing customerName");
        errors.customerName = "Name is required";
      }
      if (!customerEmail?.trim()) {
        console.log("❌ Missing customerEmail");
        errors.customerEmail = "Email is required";
      }
      if (!customerPhone?.trim()) {
        console.log("❌ Missing customerPhone");
        errors.customerPhone = "Phone is required";
      }

      // Email validation
      if (customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
        console.log("❌ Invalid email format:", customerEmail);
        errors.customerEmail = "Invalid email format";
      }

      // Phone validation - DETAILED LOGGING
      const phoneToTest = customerPhone
        ? customerPhone.replace(/[-\s]/g, "")
        : "";
      console.log("📱 Phone validation:", {
        original: customerPhone,
        cleaned: phoneToTest,
        regex: /^(\+92|0)?3[0-9]{9}$/,
        passes: /^(\+92|0)?3[0-9]{9}$/.test(phoneToTest),
      });

      if (customerPhone && !/^(\+92|0)?3[0-9]{9}$/.test(phoneToTest)) {
        console.log("❌ Invalid phone format");
        errors.customerPhone = "Invalid phone number";
      }
    }

    if (Object.keys(errors).length > 0) {
      console.log("❌ Validation errors found:", errors);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    console.log("✅ Validation passed, finding service...");

    // Verify service
    const service = await Service.findById(serviceId);

    console.log("🔍 Service lookup:", {
      found: !!service,
      name: service?.name,
      isActive: service?.isActive,
      availableForBooking: service?.availableForBooking,
    });

    if (!service) {
      console.log("❌ Service not found");
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    if (service.availableForBooking === false) {
      console.log("❌ Service not available for booking");
      return res.status(400).json({
        success: false,
        message: "Service is not available for booking",
      });
    }

    console.log("✅ Service is available");

    // Date validation
    const selectedDate = new Date(appointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log("📅 Date validation:", {
      selectedDate: selectedDate.toISOString(),
      today: today.toISOString(),
      isPast: selectedDate < today,
    });

    if (selectedDate < today) {
      console.log("❌ Date is in the past");
      return res.status(400).json({
        success: false,
        message: "Cannot book appointments in the past",
      });
    }

    console.log("✅ Date validation passed, checking slot availability...");

    // Check slot availability
    const existingAppointment = await Appointment.findOne({
      appointmentDate: selectedDate,
      appointmentTime,
      status: { $nin: ["cancelled"] },
    });

    console.log("🔍 Slot check:", {
      existingAppointment: !!existingAppointment,
      date: appointmentDate,
      time: appointmentTime,
    });

    if (existingAppointment) {
      console.log("❌ Slot already booked");
      return res.status(400).json({
        success: false,
        message:
          "This time slot is already booked. Please choose another time.",
      });
    }

    console.log("✅ Slot is available, preparing appointment data...");

    // Prepare appointment data
    const appointmentData = {
      service: serviceId,
      appointmentDate: selectedDate,
      appointmentTime,
      duration: service.duration || 60,
      notes: notes?.trim() || "",
      price: service.price || 0,
      status: "pending",
    };

    // Add user data
    if (isAuthenticated) {
      appointmentData.customer = req.user._id;
      appointmentData.customerName = req.user.name;
      appointmentData.customerEmail = req.user.email;
      appointmentData.customerPhone = req.user.phone || "";
    } else {
      appointmentData.customerName = customerName.trim();
      appointmentData.customerEmail = customerEmail.trim().toLowerCase();
      appointmentData.customerPhone = customerPhone.trim();
    }

    console.log("💾 Creating appointment with data:", appointmentData);

    // Create appointment
    const appointment = await Appointment.create(appointmentData);
    await appointment.populate("service", "name description price duration");

    console.log("✅ Appointment created:", appointment._id);

    // Send confirmation email
    try {
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #BB8C4B 0%, #D79A4A 100%); padding: 30px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 28px; }
            .content { padding: 30px; }
            .detail-box { background: #f5f5f5; padding: 15px; margin: 15px 0; border-left: 4px solid #BB8C4B; }
            .detail-box p { margin: 8px 0; }
            .footer { background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💎 Diamond Trim Beauty Studio</h1>
            </div>
            <div class="content">
              <h2>Appointment Confirmation</h2>
              <p>Hi ${appointmentData.customerName},</p>
              <p>Your appointment has been successfully booked and is pending confirmation.</p>
              <div class="detail-box">
                <p><strong>Service:</strong> ${service.name}</p>
                <p><strong>Date:</strong> ${new Date(appointmentDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                <p><strong>Time:</strong> ${appointmentTime}</p>
                <p><strong>Duration:</strong> ${service.duration} minutes</p>
                <p><strong>Price:</strong> Rs. ${service.price}</p>
              </div>
              ${notes ? `<p><strong>Your Notes:</strong> ${notes}</p>` : ""}
              <p>We will confirm your appointment shortly.</p>
            </div>
            <div class="footer">
              <p>Diamond Trim Beauty Studio</p>
            </div>
          </div>
        </body>
        </html>
      `;

      await sendEmail({
        to: appointmentData.customerEmail,
        subject: "Appointment Confirmation - Diamond Trim Beauty Studio",
        html: emailHtml,
      });

      console.log("✅ Email sent to:", appointmentData.customerEmail);
    } catch (emailError) {
      console.error("⚠️ Email failed (non-critical):", emailError.message);
      // Don't fail the request if email fails
    }

    console.log("✅ Booking completed successfully");

    res.status(201).json({
      success: true,
      message:
        "Appointment booked successfully! Check your email for confirmation.",
      appointment,
    });
  } catch (error) {
    console.error("❌ Appointment creation error:", error);

    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      console.log("❌ Mongoose validation errors:", errors);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    next(error);
  }
};
/* =========================================
   GET MY APPOINTMENTS (AUTH USERS)
========================================= */
exports.getMyAppointments = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    // Find appointments by customer ID OR email (for bookings made before login)
    const query = {
      $or: [{ customer: req.user._id }, { customerEmail: req.user.email }],
    };

    if (status) query.status = status;

    const appointments = await Appointment.find(query)
      .populate("service", "name description price duration category")
      .populate("staff", "name email phone")
      .sort({ appointmentDate: -1, appointmentTime: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Appointment.countDocuments(query); // ← ADD THIS LINE

    res.json({
      success: true,
      appointments,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================================
   CANCEL APPOINTMENT
========================================= */
exports.cancelAppointment = async (req, res, next) => {
  try {
    const { cancellationReason } = req.body;
    const appointment = await Appointment.findById(req.params.id).populate(
      "service",
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Check if appointment is in the past
    const apptDate = new Date(appointment.appointmentDate);
    const now = new Date();

    if (apptDate < now) {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel past appointments",
      });
    }

    // Check if already cancelled
    if (appointment.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Appointment is already cancelled",
      });
    }

    appointment.status = "cancelled";
    appointment.cancellationReason =
      cancellationReason || "Cancelled by customer";
    appointment.cancelledAt = Date.now();
    await appointment.save();

    // Send cancellation email
    try {
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background: white;">
            <div style="background: linear-gradient(135deg, #BB8C4B 0%, #D79A4A 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0;">💎 Diamond Trim</h1>
            </div>
            <div style="padding: 30px;">
              <h2>Appointment Cancelled</h2>
              <p>Hi ${appointment.customerName},</p>
              <p>Your appointment has been cancelled.</p>
              <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-left: 4px solid #ef4444;">
                <p><strong>Service:</strong> ${appointment.service.name}</p>
                <p><strong>Date:</strong> ${new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
              </div>
              <p>If you'd like to rebook, please visit our website.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      await sendEmail({
        to: appointment.customerEmail,
        subject: "Appointment Cancelled - Diamond Trim",
        html: emailHtml,
      });
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    res.json({
      success: true,
      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

// Export remaining functions...
exports.getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("service", "name description price duration category")
      .populate("customer", "name email phone")
      .populate("staff", "name email phone");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllAppointments = async (req, res, next) => {
  try {
    const { status, date, service, page = 1, limit = 20, search } = req.query;

    const query = {};

    if (status) query.status = status;
    if (date) query.appointmentDate = new Date(date);
    if (service) query.service = service;

    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { customerEmail: { $regex: search, $options: "i" } },
      ];
    }

    const appointments = await Appointment.find(query)
      .populate("service", "name description price duration category")
      .populate("customer", "name email phone")
      .populate("staff", "name email phone")
      .sort({ appointmentDate: -1, appointmentTime: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Appointment.countDocuments(query);

    const stats = await Appointment.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      appointments,
      stats,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      total: count,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id)
      .populate("service")
      .populate("customer");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    const oldStatus = appointment.status;
    appointment.status = status;

    if (status === "confirmed") {
      appointment.confirmedBy = req.user?._id || null;
      appointment.confirmedAt = Date.now();
    }

    await appointment.save();

    // Send email notification
    const statusColors = {
      confirmed: "#22c55e",
      completed: "#3b82f6",
      cancelled: "#ef4444",
    };

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #BB8C4B 0%, #D79A4A 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">💎 Diamond Trim</h1>
          </div>
          <div style="padding: 30px;">
            <h2>Appointment Status Updated</h2>
            <p>Hi ${appointment.customerName},</p>
            <p>Your appointment status has been updated to: <strong style="color: ${statusColors[status] || "#000"};">${status.toUpperCase()}</strong></p>
            <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-left: 4px solid #BB8C4B;">
              <p><strong>Service:</strong> ${appointment.service.name}</p>
              <p><strong>Date:</strong> ${new Date(appointment.appointmentDate).toLocaleDateString()}</p>
              <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await sendEmail({
        to: appointment.customerEmail,
        subject: `Appointment ${status.toUpperCase()} - Diamond Trim`,
        html: emailHtml,
      });
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    res.json({
      success: true,
      message: "Appointment status updated",
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

exports.assignStaff = async (req, res, next) => {
  try {
    const { staffId } = req.body;

    const staff = await User.findById(staffId);
    if (!staff || !["staff", "manager", "admin"].includes(staff.role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid staff member",
      });
    }

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appointment.staff = staffId;
    await appointment.save();

    res.json({
      success: true,
      message: "Staff assigned successfully",
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

exports.rescheduleAppointment = async (req, res, next) => {
  try {
    const { appointmentDate, appointmentTime } = req.body;

    const appointment = await Appointment.findById(req.params.id)
      .populate("service")
      .populate("customer");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Check authorization
    if (
      appointment.customer._id.toString() !== req.user._id.toString() &&
      !["admin", "staff", "manager"].includes(req.user.role)
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Check if new slot is available
    const existingAppointment = await Appointment.findOne({
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      status: { $nin: ["cancelled"] },
      _id: { $ne: appointment._id },
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: "This time slot is already booked",
      });
    }

    const oldDate = new Date(appointment.appointmentDate).toLocaleDateString();
    const oldTime = appointment.appointmentTime;

    appointment.appointmentDate = appointmentDate;
    appointment.appointmentTime = appointmentTime;
    await appointment.save();

    // Send email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial;">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #BB8C4B 0%, #D79A4A 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">💎 Diamond Trim</h1>
          </div>
          <div style="padding: 30px;">
            <h2>Appointment Rescheduled</h2>
            <p>Hi ${appointment.customerName},</p>
            <p>Your appointment has been rescheduled:</p>
            <div style="background: #fee; padding: 15px; margin: 20px 0; border-left: 4px solid #ef4444;">
              <strong>Previous:</strong><br>
              ${oldDate} at ${oldTime}
            </div>
            <div style="background: #efe; padding: 15px; margin: 20px 0; border-left: 4px solid #22c55e;">
              <strong>New:</strong><br>
              ${new Date(appointmentDate).toLocaleDateString()} at ${appointmentTime}
            </div>
            <p><strong>Service:</strong> ${appointment.service.name}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await sendEmail({
        to: appointment.customerEmail,
        subject: "Appointment Rescheduled - Diamond Trim",
        html: emailHtml,
      });
    } catch (emailError) {
      console.error("Email error:", emailError);
    }

    res.json({
      success: true,
      message: "Appointment rescheduled successfully",
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAppointmentStats = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = {
      total: await Appointment.countDocuments(),
      pending: await Appointment.countDocuments({ status: "pending" }),
      confirmed: await Appointment.countDocuments({ status: "confirmed" }),
      completed: await Appointment.countDocuments({ status: "completed" }),
      cancelled: await Appointment.countDocuments({ status: "cancelled" }),
      today: await Appointment.countDocuments({
        appointmentDate: {
          $gte: today,
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      }),
    };

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    next(error);
  }
};
