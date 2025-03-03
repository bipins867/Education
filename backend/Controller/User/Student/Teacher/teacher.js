
const Student = require("../../../../Models/User/student");
const Teacher = require("../../../../Models/User/teacher");
const User = require("../../../../Models/User/users");




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

    const existingSubscription = await StudentTeacher.findOne({
      where: {
        StudentId: student.id,
        TeacherId: teacher.id
      }
    });
    if(existingSubscription){
      return res.status(400).json({ success: false, message: "Already subscribed to this teacher" });
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
  try {
      const studentId = req.user.id;
      
      // First find the student record
      const student = await Student.findOne({ 
          where: { UserId: studentId }
      });

      if (!student) {
          return res.status(404).json({
              success: false,
              message: "Student not found"
          });
      }

      // Get teachers using the proper association
      const subscribedTeachers = await Student.findOne({
          where: { id: student.id },
          include: [{
              model: Teacher,
              include: [{
                  model: User,
                  attributes: ['name', 'email', 'phone', 'profileUrl']
              }]
          }]
      });
      
      if (!subscribedTeachers || !subscribedTeachers.Teachers) {
          return res.status(200).json({
              success: true,
              data: []
          });
      }

      // Format the response
      const formattedTeachers = subscribedTeachers.Teachers.map(teacher => ({
          id: teacher.id,
          qualification: teacher.qualification,
          name: teacher.User.name,
          email: teacher.User.email,
          phone: teacher.User.phone,
          profileUrl: teacher.User.profileUrl
      }));

      res.status(200).json({
          success: true,
          data: formattedTeachers
      });

  } catch (error) {
      console.error("Error getting subscribed teachers:", error);
      res.status(500).json({
          success: false,
          message: "Internal server error"
      });
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
