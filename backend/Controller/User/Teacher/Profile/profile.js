const Teacher = require("../../../../Models/User/teacher");

exports.getProfile = async (req, res, next) => {
  try {
    const teacher = await req.instUser.getTeacher();
    res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    console.error("Error fetching teacher profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = req.user; // Authenticated user
    const { qualification } = req.body;

    // Fetch teacher profile
    let teacher = await user.getTeacher();

    if (!teacher) {
      return res
        .status(404)
        .json({ success: false, message: "Teacher profile not found" });
    }

    // Update the qualification field
    teacher.qualification = qualification;
    await teacher.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: teacher,
    });
  } catch (error) {
    console.error("Error updating teacher profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
