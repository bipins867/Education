
const Admin = require("../../Models/User/admins");
const bcrypt = require("bcrypt");


exports.createSSAdmin = async (req, res, next) => {
  try {
    // Check if any SSA type admin already exists
    const existingSSA = await Admin.findOne({ where: { adminType: "SSA" } });
    if (existingSSA) {
      return res.status(400).json({
        message: "SSA type admin already exists. Cannot create another.",
      });
    }

    // Generate random username
    //const userName = "XDMJT36652"//generateRandomId();

    // Extract password from request body
    const { password,userName, name, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create the new SSA admin
    const newSSAAdmin = await Admin.create({
      userName,
      adminType: "SSA",
      password: hashedPassword,
      freezeStatus: false,
      name,
      email,
    });

    return res.status(201).json({
      message: "SSA type admin created successfully.",
      admin: newSSAAdmin,
    });
  } catch (error) {
    console.error("Error creating SSA admin:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};