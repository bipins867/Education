const jwt = require("jsonwebtoken");
const Admin = require("../Models/User/admins");
const User = require("../Models/User/users");
const Institute = require("../Models/Institute/institute");
const Student = require("../Models/User/student");
const Teacher = require("../Models/User/teacher");

exports.adminAuthentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // Verify the JWT token and extract the payload
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the admin by primary key (id)
    const admin = await Admin.findByPk(payload.id);

    // Check if the admin exists
    if (!admin) {
      return res.status(404).json({ error: "Admin not found!" });
    }

    // Check freeze status for admin types 'SA' and 'A'
    if (
      (admin.adminType === "SA" || admin.adminType === "A") &&
      admin.isDeactivated
    ) {
      return res
        .status(403)
        .json({ error: "Access denied. Admin account is Deactivated!" });
    }

    // Check freeze status for admin types 'SA' and 'A'
    if (
      (admin.adminType === "SA" || admin.adminType === "A") &&
      admin.freezeStatus
    ) {
      return res
        .status(403)
        .json({ error: "Access denied. Admin account is frozen!" });
    }

    // Assign the admin object to the request object
    req.admin = admin;

    // Proceed to the next middleware
    next();
  } catch (err) {
    return res.status(503).json({ error: "Invalid Signature!" });
  }
};

exports.instituteAuthentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login to access this resource",
      });
    }

    // Verify token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decodedData.type !== "institute") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // Get institute details
    const institute = await Institute.findOne({
      where: {
        id: decodedData.id,
        isActive: true,
        isBlocked: false,
      },
    });

    if (!institute) {
      return res.status(401).json({
        success: false,
        message: "Institute not found or access denied",
      });
    }

    req.institute = institute;
    req.userType = decodedData.type;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ... existing imports and middleware ...

exports.teacherAuthentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login to access this resource",
      });
    }

    // Verify token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decodedData.userType !== "teacher") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access. Teachers only.",
      });
    }

    const institute = await Institute.findOne({
      where: {
        id: decodedData.instituteId,
        isActive: true,
        isBlocked: false,
      },
    });
    if (!institute) {
      return res.status(401).json({
        success: false,
        message: "Institute not found or access denied",
      });
    }

    const instUser = await InstUser.findOne({
      where: {
        id: decodedData.instUserId,
      },
    });
    // Get user and teacher details
    const user = await User.findOne({
      where: {
        id: decodedData.id,
        isBlocked: false,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found or access denied",
      });
    }

    const teacher = await Teacher.findOne({
      where: {
        id: decodedData.teacherId,
      },
    });

    if (!teacher) {
      return res.status(401).json({
        success: false,
        message: "Teacher profile not found",
      });
    }

    // Add user and teacher to request object
    req.institute = institute;
    req.user = user;
    req.teacher = teacher;
    req.instituteId = decodedData.instituteId;
    req.instUser = instUser;
    req.userType = decodedData.userType;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.studentAuthentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login to access this resource",
      });
    }

    // Verify token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decodedData.userType !== "student") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access. Students only.",
      });
    }

    const institute = await Institute.findOne({
      where: {
        id: decodedData.instituteId,
        isActive: true,
        isBlocked: false,
      },
    });
    if (!institute) {
      return res.status(401).json({
        success: false,
        message: "Institute not found or access denied",
      });
    }
    const instUser = await InstUser.findOne({
      where: {
        id: decodedData.instUserId,
      },
    });
    // Get user and student details
    const user = await User.findOne({
      where: {
        id: decodedData.id,
        isBlocked: false,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found or access denied",
      });
    }

    const student = await Student.findOne({
      where: {
        id: decodedData.studentId,
      },
    });

    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Student profile not found",
      });
    }

    // Add user and student to request object
    req.user = user;
    req.student = student;
    req.instituteId = decodedData.instituteId;
    req.institute = institute;
    req.instUser = instUser;
    req.userType = decodedData.userType;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
