const {
  storageUseType,
  S3_FILE_PATH,
} = require("../../../../importantInfo");
const { v4: uuidv4 } = require("uuid");
const { saveFile } = require("../../../../Utils/fileHandler");
const path = require("path");

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
    const instUser = req.instUser; // Authenticated instUser
    const {
      name,
      email,
      rollNumber,
      studentClass,
      section,
      // Add any other fields you want to update
    } = req.body;
    const imageFile = req.files?.image ? req.files.image[0] : null;
    // Fetch student profile
    let student = await instUser.getStudent();

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }
    let imageData;
    if (imageFile) {
      imageData = await saveFile(
        imageFile,
        path.join("CustomFiles", "Student"),
        uuidv4()
      );
    }
    let imageUrl = "";
    if (imageData) {
      if (storageUseType === "supabase") {
        imageUrl = `${S3_FILE_PATH}/${imageData.path}`;
      } else {
        imageUrl = imageData;
      }
    }
    // Update the fields
    student.name = name || student.name;
    student.email = email || student.email;
    student.rollNumber = rollNumber || student.rollNumber;
    student.studentClass = studentClass || student.studentClass;
    student.section = section || student.section;
    student.imageUrl = imageUrl || student.imageUrl;

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
