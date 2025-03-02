const StudentTeacher = require("../../../../Models/AndModels/StudentTeacher");
const Student = require("../../../../Models/User/student");
const Teacher = require("../../../../Models/User/teacher");

exports.getSubscribedStudents = async (req, res) => {
  const teacherId = req.user.id;
  try {
    const teacher = await Teacher.findOne({ where: { UserId: teacherId } });
    const subscribedStudents = await StudentTeacher.findAll({
      where: { TeacherId: teacher.id },
      include: [{ model: Student, attributes: ["id", "name", "email"] }],
    });
    res.status(200).json({ success: true, data: subscribedStudents });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getStudentDetails = async (req, res) => {
  const { studentId } = req.body;
  const teacherId = req.user.id;
  try {
    const student = await Student.findByPk(studentId);
    const teacher = await Teacher.findOne({ where: { UserId: teacherId } });
    const studentTeacher = await StudentTeacher.findOne({
      where: { StudentId: student.id, TeacherId: teacher.id },
    });
    if (!studentTeacher) {
      return res
        .status(404)
        .json({ success: false, message: "Student not subscribed to teacher" });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


exports.searchStudent = async (req, res) => {
  const { searchQuery } = req.body;
  const teacherId = req.user.id;
  try {
    const students = await Student.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${searchQuery}%` } },
          { email: { [Op.like]: `%${searchQuery}%` } }
        ]
      },
    });
    const teacher = await Teacher.findOne({ where: { UserId: teacherId } });
    
    const subscribedStudents = await StudentTeacher.findAll({
      where: { TeacherId: teacher.id },
    });
    const searchedStudents = [];
    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      const isSubscribed = subscribedStudents.some(
        (subscribedStudent) => subscribedStudent.StudentId === student.id
      );
      if (isSubscribed) {
        searchedStudents.push(student);
      }
    }

    res.status(200).json({ success: true, data: searchedStudents });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
