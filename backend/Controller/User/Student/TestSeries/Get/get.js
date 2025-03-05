const Category = require("../../../../../Models/TestSeries/Category");
const Series = require("../../../../../Models/TestSeries/Series");
const Test = require("../../../../../Models/TestSeries/Test");
const Question = require("../../../../../Models/TestSeries/Question");
const Option = require("../../../../../Models/TestSeries/Option");

exports.getCategories = async (req, res) => {
  
  try {
    const categories = await Category.findAll({
      where: {
        isActive: true,
        InstituteId: req.institute.id,
      },
    });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getSeries = async (req, res) => {
  const { categoryId } = req.body;
  try {
    const series = await Series.findAll({
      where: {
        isActive: true,
        CategoryId: categoryId,
        InstituteId: req.institute.id,
      },
    });
    res.status(200).json({ success: true, data: series });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getTests = async (req, res) => {
  const { seriesId } = req.body;
  try {
    const test = await Test.findAll({
      where: {
        isActive: true,
        SeriesId: seriesId,
        InstituteId: req.institute.id,
      },
    });
    res.status(200).json({ success: true, data: test });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getQuestions = async (req, res) => {
  const { testId } = req.body;
  try {
    const question = await Question.findAll({
      where: {
        isActive: true,
        TestId: testId,
        InstituteId: req.institute.id,
      },
      include: [
        {
          model: Option,
          as: "options",
        },
      ],
    });
    res.status(200).json({ success: true, data: question });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getOptions = async (req, res) => {
  const { questionId } = req.body;
  try {
    const option = await Option.findAll({
      where: {
        isActive: true,
        QuestionId: questionId,
        InstituteId: req.institute.id,
      },
    });
    res.status(200).json({ success: true, data: option });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

