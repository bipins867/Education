
const Student = require("../../../../Models/User/student");
const Teacher = require("../../../../Models/User/teacher");
const User = require("../../../../Models/User/users");


exports.getSubscribedStudents = async (req, res) => {
  try {
      const teacherId = req.user.id;
      
      // First find the teacher record
      const teacher = await Teacher.findOne({ 
          where: { UserId: teacherId }
      });

      if (!teacher) {
          return res.status(404).json({
              success: false,
              message: "Teacher not found"
          });
      }

      // Get students using the proper association
      const subscribedStudents = await Teacher.findOne({
          where: { id: teacher.id },
          include: [{
              model: Student,
              include: [{
                  model: User,
                  attributes: ['name', 'email', 'phone', 'profileUrl']
              }]
          }]
      });

      if (!subscribedStudents || !subscribedStudents.Students) {
          return res.status(200).json({
              success: true,
              data: []
          });
      }

      // Format the response
      const formattedStudents = subscribedStudents.Students.map(student => ({
          id: student.id,
          rollNumber: student.rollNumber,
          studentClass: student.studentClass,
          section: student.section,
          name: student.User.name,
          email: student.User.email,
          phone: student.User.phone,
          profileUrl: student.User.profileUrl
      }));

      res.status(200).json({
          success: true,
          data: formattedStudents
      });

  } catch (error) {
      console.error("Error getting subscribed students:", error);
      res.status(500).json({
          success: false,
          message: "Internal server error"
      });
  }
};

exports.getStudentDetails = async (req, res) => {
  const { studentId } = req.body;
  const teacherId = req.user.id;
  try {
    const student = await Student.findByPk(studentId);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }
    
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
