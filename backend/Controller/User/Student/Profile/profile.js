const StudentProfile = require("../../../../Models/User/studentProfile");

exports.getProfile = async (req, res, next) => {
  try {
    const user = req.user; // Authenticated user

    if (user.userType !== "student") {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }
    // Try to fetch the existing student profile
    let studentProfile = await user.getStudentProfile();

    // If no profile exists, create a new one
    if (!studentProfile) {
      studentProfile = await StudentProfile.create({ UserId: user.id });
    }

    res.status(200).json({
      success: true,
      data: studentProfile,
    });
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = req.user; // Authenticated user
    const {
      grade,
      school,
      dateOfBirth,
      parentContact,
      address,
      // Add any other fields you want to update
    } = req.body;

    // Fetch student profile
    let studentProfile = await user.getStudentProfile();

    if (!studentProfile) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    // Update the fields
    studentProfile.grade = grade || studentProfile.grade;
    studentProfile.school = school || studentProfile.school;
    studentProfile.dateOfBirth = dateOfBirth || studentProfile.dateOfBirth;
    studentProfile.parentContact =
      parentContact || studentProfile.parentContact;
    studentProfile.address = address || studentProfile.address;

    await studentProfile.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: studentProfile,
    });
  } catch (error) {
    console.error("Error updating student profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
