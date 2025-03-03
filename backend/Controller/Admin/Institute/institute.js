const Institute = require("../../../Models/Institute/institute");
const InstituteProfile = require("../../../Models/Institute/instituteProfile");
const { generateRandomId } = require("../../../Utils/utils");
const { createAdminActivity } = require("../../../Utils/activityUtils");
const { saveFile } = require("../../../Utils/fileHandler");
const { storageUseType, S3_FILE_PATH } = require("../../../importantInfo");
const { sequelize } = require("../../../importantInfo");
const { Op } = require("sequelize");

const bcrypt = require("bcrypt");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

exports.createInstitute = async (req, res) => {
  let t;
  try {
    const { password, title, description, phone, email } = req.body;

    const imageFile = req.files?.image ? req.files.image[0] : null;

    // Validate required fields
    if (!password || !title || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "Password, title, phone and email are required",
      });
    }

    if (phone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be 10 digits",
      });
    }

    // Handle image upload
    let imageUrl = "";
    if (imageFile) {
      const imageData = await saveFile(
        imageFile,
        path.join("CustomFiles", "Institutes"),
        uuidv4()
      );

      if (imageData) {
        imageUrl =
          storageUseType === "supabase"
            ? `${S3_FILE_PATH}/${imageData.path}`
            : imageData;
      }
    }
    const existingInstitute = await Institute.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
    });

    if (existingInstitute) {
      return res.status(400).json({
        success: false,
        message: "Institute already exists with this email or phone number",
      });
    }

    t = await sequelize.transaction();
    // Generate instituteId
    const instituteId = generateRandomId();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Institute
    const institute = await Institute.create(
      {
        instituteId,
        password: hashedPassword,
        email,
        phone,
        isActive: true,
        isBlocked: false,
      },
      { transaction: t }
    );

    // Create Institute Profile
    const instituteProfile = await InstituteProfile.create(
      {
        InstituteId: institute.id,
        title,
        description,
        imageUrl,
      },
      { transaction: t }
    );

    // Create admin activity log
    await createAdminActivity(
      req,
      req.admin,
      "institute",
      `Created new institute: ${title}`,
      null,
      t
    );

    await t.commit();

    return res.status(201).json({
      success: true,
      message: "Institute created successfully",
      data: {
        institute: {
          id: institute.id,
          instituteId: institute.instituteId,
        },
        profile: instituteProfile,
      },
    });
  } catch (error) {
    if (t) {
      await t.rollback();
    }
    console.error("Error creating institute:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
