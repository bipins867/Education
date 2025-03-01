const jwt = require("jsonwebtoken");
const User = require("../../../Models/User/users");

exports.userAuth = async (req, res) => {
  try {
    const { phone ,userType} = req.body;

    if (!phone) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number is required" });
    }
    if (phone.length !== 10) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid phone number" });
    }

    let user = await User.findOne({ where: { phone } });

    if (!user) {
      // Create a new user if not found
      if(!userType){
        userType='student';
      }
      user = await User.create({
        phone,
        userType,
      });
    }

    // Generate JWT token
    const expiresIn = process.env.NODE_ENV === "testing" ? "30d" : "7d";
    const token = jwt.sign(
      { id: user.id, phone: user.phone },
      process.env.JWT_SECRET_KEY,
      { expiresIn } // Token valid for 7 days
    );

    return res
      .status(200)
      .json({ success: true, token, isDetailsUpdated: user.isDetailsUpdated });
  } catch (error) {
    console.error("Error in userAuth:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
