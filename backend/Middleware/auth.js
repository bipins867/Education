const jwt = require("jsonwebtoken");
const Admin = require("../Models/User/admins");



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

