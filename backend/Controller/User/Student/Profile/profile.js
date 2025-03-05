

exports.getProfile = async (req, res, next) => {
  try {
    const student = await req.instUser.getStudent();
    
    res.status(200).json({ success: true, data: student });
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
    let student = await user.getStudent();

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    // Update the fields
    student.grade = grade || student.grade;
    student.school = school || student.school;
    student.dateOfBirth = dateOfBirth || student.dateOfBirth;
    student.parentContact = parentContact || student.parentContact;
    student.address = address || student.address;

    await student.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: student,
    });
  } catch (error) {
    console.error("Error updating student profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
