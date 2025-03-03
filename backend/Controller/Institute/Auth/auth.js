const Institute = require("../../../Models/Institute/institute");

const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { EXPIRE_TIME } = require("../../../importantInfo");

exports.instituteLogin = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({
        success: false,
        message: "Email/Phone and password are required",
      });
    }

    // Find institute by email or phone
    const institute = await Institute.findOne({
      where: {
        [Op.or]: [{ email: emailOrPhone }, { phone: emailOrPhone }],
        isActive: true,
      },
    });

    if (!institute) {
      return res.status(404).json({
        success: false,
        message: "Institute not found",
      });
    }

    // Check if institute is blocked
    if (institute.isBlocked) {
      return res.status(403).json({
        success: false,
        message:
          "Your institute account has been blocked. Please contact administrator.",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, institute.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: institute.id,
        instituteId: institute.instituteId,
        type: "institute",
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: EXPIRE_TIME }
    );

    // Return success response with token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        institute: {
          id: institute.id,
          instituteId: institute.instituteId,
          email: institute.email,
          phone: institute.phone,
        },
      },
    });
  } catch (error) {
    console.error("Institute login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
