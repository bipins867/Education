const InstUser = require("../../../../Models/AndModels/InstUser");
const Student = require("../../../../Models/User/student");

exports.getStudents = async (req, res) => {
  try {
    const students = await InstUser.findAll({
      where: { userType: "student", InstituteId: req.institute.id },
      include: [
        {
          model: Student,
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data: students,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
