const InstUser = require("../../../../Models/AndModels/InstUser");
const Teacher = require("../../../../Models/User/teacher");
const User = require("../../../../Models/User/users");
const { sequelize } = require("../../../../importantInfo");

exports.createTeacher = async (req, res) => {
  const { name, email, phone, qualification } = req.body;
  let transaction;

  try {
    let user = await User.findOne({ where: { phone } });

    transaction = await sequelize.transaction();

    if (!user) {
      user = await User.create({ phone }, { transaction });
    }

    let instUser = await InstUser.findOne({
      where: { UserId: user.id, InstituteId: req.institute.id },
    });

    if (instUser) {
      return res
        .status(400)
        .json({ success: false, message: "Teacher or Student already exists" });
    }
    instUser = await InstUser.create(
      { UserId: user.id, InstituteId: req.institute.id, userType: "teacher" },
      { transaction }
    );
    await Teacher.create(
      { name, email, qualification, InstUserId: instUser.id },
      { transaction }
    );
    await transaction.commit();
    res
      .status(201)
      .json({ success: true, message: "Teacher created successfully" });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};
