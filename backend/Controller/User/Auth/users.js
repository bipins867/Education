const jwt = require("jsonwebtoken");
const User = require("../../../Models/User/users");
const { sequelize, EXPIRE_TIME } = require("../../../importantInfo");
const InstUser = require("../../../Models/AndModels/InstUser");
const Institute = require("../../../Models/Institute/institute");
const Teacher = require("../../../Models/User/teacher");
const Student = require("../../../Models/User/student");

exports.studentAuth = async (req, res) => {
  let transaction;
  try {
    const { phone, instituteId } = req.body;

    if (!phone || !instituteId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const institute = await Institute.findOne({
      where: { instituteId: instituteId },
    });
    if (!institute) {
      return res
        .status(400)
        .json({ success: false, message: "Institute not found" });
    }

    transaction = await sequelize.transaction();
    let user = await User.findOne({ where: { phone } });

    if (!user) {
      user = await User.create(
        {
          phone,
        },
        { transaction }
      );
    }

    let instUser = await InstUser.findOne({
      where: { InstituteId: institute.id, UserId: user.id },
    });
    if (!instUser) {
      instUser = await InstUser.create(
        {
          InstituteId: institute.id,
          userType: "student",
          UserId: user.id,
        },
        { transaction }
      );

      await Student.create(
        {
          phone,

          InstUserId: instUser.id,
        },
        { transaction }
      );
    }

    if (instUser.userType === "teacher") {
      return res
        .status(400)
        .json({ success: false, message: "Teacher cannot login as student" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        userType: "student",
        studentId: Student.id,
        phone: user.phone,
        instituteId: institute.instituteId,
        instUserId: instUser.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: EXPIRE_TIME }
    );

    await transaction.commit();

    return res
      .status(200)
      .json({ success: true, token, isDetailsUpdated: user.isDetailsUpdated });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.error("Error in studentAuth:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.teacherAuth = async (req, res) => {
  try {
    const { phone, instituteId } = req.body;

    if (!phone || !instituteId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const institute = await Institute.findOne({
      where: {
        instituteId,
      },
    });
    if (!institute) {
      return res
        .status(404)
        .json({ success: false, message: "Institute not found" });
    }

    const user = await User.findOne({ where: { phone } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let instUser = await InstUser.findOne({
      where: { InstituteId: institute.id, UserId: user.id },
      include: [Teacher],
    });

    if (!instUser || !instUser.Teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found in this institute",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        userType: "teacher",
        teacherId: Teacher.id,
        phone: user.phone,
        instituteId: institute.instituteId,
        instUserId: instUser.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: EXPIRE_TIME }
    );

    return res
      .status(200)
      .json({ success: true, token, isDetailsUpdated: user.isDetailsUpdated });
  } catch (error) {
    console.error("Error in teacherAuth:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
