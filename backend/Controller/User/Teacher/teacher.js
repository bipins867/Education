
const InstUser = require("../../../Models/AndModels/InstUser");
const Teacher = require("../../../Models/User/teacher");

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await InstUser.findAll({
      where: { userType: "teacher", InstituteId: req.institute.id },
      include: [
        {
          model: Teacher,
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Teachers fetched successfully",
      data: teachers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
