const jwt = require("jsonwebtoken");
const Admin = require("../Models/User/admins");
const User = require("../Models/User/users");

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

exports.userAuthentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findByPk(payload.id);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    if (user.isBlocked) {
      return res.status(402).json({
        error:
          "User Account is blocked. Please contact customer support for any query!",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(503).json({ error: "Invalid Signature!" });
  }
};

exports.studentAuthentication = async (req, res, next) => {
  if (req.user.userType === "student") {
    next();
  } else {
    return res.status(403).json({ error: "Only student can access this route" });
  }
};

exports.teacherAuthentication = async (req, res, next) => {
  if (req.user.userType === "teacher") {
    next();
  } else {
    return res.status(403).json({ error: "Only teacher can access this route" });
  }
};
