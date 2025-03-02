const StudentTeacher = require("../../../Models/AndModels/StudentTeacher");
const Student = require("../../../Models/User/student");
const Teacher = require("../../../Models/User/teacher");

exports.subscribeToTeacher = async (req, res) => {
  const { teacherId } = req.body;
  const studentId = req.user.id;

  try {
    if (!teacherId) {
      return res
        .status(400)
        .json({ success: false, message: "Teacher ID is required" });
    }
    const teacher = await Teacher.findByPk(teacherId);
    const student = await Student.findOne({ where: { UserId: studentId } });

    if (!teacher || !student) {
      return res
        .status(404)
        .json({ success: false, message: "Teacher or student not found" });
    }

    await StudentTeacher.create({
      StudentId: student.id,
      TeacherId: teacher.id,
    });

    res.status(200).json({ success: true, message: "Subscribed to teacher" });
  } catch (error) {
    console.error("Error subscribing to teacher:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getSubscribedTeachers = async (req, res) => {
  const studentId = req.user.id;
  try {
    const student = await Student.findOne({ where: { UserId: studentId } });

    const subscribedTeachers = await StudentTeacher.findAll({
      where: { StudentId: student.id },
      include: [{ model: Teacher, attributes: ["id", "name", "email"] }],
    });

    res.status(200).json({ success: true, data: subscribedTeachers });
  } catch (error) {
    console.error("Error getting subscribed teachers:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getTeachersList = async (req, res) => {
  try {
    const teachers = await Teacher.findAll();
    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
