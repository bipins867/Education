const {
  storageUseType,
  S3_FILE_PATH,
} = require("../../../../importantInfo");
const { v4: uuidv4 } = require("uuid");
const { saveFile } = require("../../../../Utils/fileHandler");
const path = require("path");

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
    const instUser = req.instUser; // Authenticated instUser
    const { name, email, qualification } = req.body;
    const imageFile = req.files?.image ? req.files.image[0] : null;

    // Fetch teacher profile
    let teacher = await instUser.getTeacher();

    if (!teacher) {
      return res
        .status(404)
        .json({ success: false, message: "Teacher profile not found" });
    }

    let imageData;
    if (imageFile) {
      imageData = await saveFile(
        imageFile,
        path.join("CustomFiles", "Teacher"),
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
    // Update the qualification field
    teacher.name = name || teacher.name;
    teacher.email = email || teacher.email;
    teacher.imageUrl = imageUrl || teacher.imageUrl;
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
