const StudentTest = require("../../../../../Models/AndModels/StudentTest");
const StudentQuestion = require("../../../../../Models/AndModels/StudentQuestion");
const Test = require("../../../../../Models/TestSeries/Test");
const Question = require("../../../../../Models/TestSeries/Question");

exports.startTest = async (req, res) => {
  try {
    const { testId } = req.body;
    const student = req.student;
    const test = await Test.findOne({
      where: { id: testId, InstitutionId: req.institute.id },
    });
    if (!test) {
      return res.status(404).json({
        message: "Test not found!",
      });
    }
    const studentTest = await StudentTest.create({
      StudentId: student.id,
      TestId: test.id,
    });
    res.status(200).json({
      message: "Test started successfully",
      studentTest,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

exports.attemptQuestion = async (req, res) => {
  try {
    const { questionId, optionId, studentTestId } = req.body;
    const student = req.student;
    const question = await Question.findOne({
      where: { id: questionId, InstitutionId: req.institute.id },
    });
    if (!question) {
      return res.status(404).json({
        message: "Question not found!",
      });
    }
    const studentQuestion = await StudentQuestion.create({
      StudentId: student.id,
      QuestionId: question.id,
      selectedOptionId: optionId,
      StudentTestId: studentTestId,
      isCorrect: optionId === question.correctOptionId,
    });
    res.status(200).json({
      message: "Question attempted successfully",
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

exports.submitTest = async (req, res) => {
  try {
    const { studentTestId } = req.body;
    const studentTest = await StudentTest.findOne({
      where: { id: studentTestId, StudentId: req.student.id },
    });
    if (!studentTest) {
      return res.status(404).json({
        message: "Student test not found!",
      });
    }
    const totalQuestions = await Question.count({
      where: { TestId: studentTest.TestId, InstitutionId: req.institute.id },
    });

    const totalAttempted = await StudentQuestion.count({
      where: { StudentId: req.student.id, StudentTestId: studentTestId },
    });

    const totalCorrect = await StudentQuestion.count({
      where: {
        StudentId: req.student.id,
        StudentTestId: studentTestId,
        isCorrect: true,
      },
    });

    const totalIncorrect = totalQuestions - totalAttempted;
    const totalScore = (totalCorrect * 100) / totalQuestions;

    await StudentTest.update(
      {
        endTime: new Date(),
        totalAttempted: totalAttempted,
        correctAnswers: totalCorrect,
        wrongAnswers: totalIncorrect,
        totalScore: totalScore,
        timeTaken:
          new Date(studentTest.endTime).getTime() -
          new Date(studentTest.startTime).getTime(),
        isCompleted: true,
      },
      { where: { id: studentTestId } }
    );
    res.status(200).json({
      message: "Test submitted successfully",
      success: true,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};

exports.getTestResults = async (req, res) => {
  try {
    const { testId } = req.body;
    const student = req.student;
    const test = await Test.findOne({
      where: { id: testId, InstitutionId: req.institute.id },
    });
    if (!test) {
      return res.status(404).json({
        message: "Test not found!",
      });
    }
    const studentTest = await StudentTest.findAll({
      where: { StudentId: student.id, TestId: testId },
    });
    res.status(200).json({
      message: "Test results fetched successfully",
      studentTest,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};
