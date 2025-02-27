const Category = require("../../../../../Models/TestSeries/Category");
const Option = require("../../../../../Models/TestSeries/Option");
const Question = require("../../../../../Models/TestSeries/Question");
const Series = require("../../../../../Models/TestSeries/Series");
const Test = require("../../../../../Models/TestSeries/Test");

// Get Categories (all or by ID)
exports.getCategories = async (req, res) => {
  try {
    const { id } = req.body;
    const UserId=req.user.id;
    let whereClause = {};
    
    if (id) whereClause.id = id;
    if (UserId) whereClause.UserId = UserId;

    const categories = await Category.findAll({ where: whereClause });

    if (id && categories.length === 0) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error });
  }
};

// Get Series (all or by ID, filtered by CategoryId)
exports.getSeries = async (req, res) => {
  try {
    const { id, CategoryId } = req.body;
    let whereClause = {};

    if (id) whereClause.id = id;
    if (CategoryId) whereClause.CategoryId = CategoryId;
    whereClause.UserId=req.user.id;

    const series = await Series.findAll({ where: whereClause });

    if (id && series.length === 0) {
      return res.status(404).json({ success: false, message: "Series not found" });
    }

    return res.status(200).json({ success: true, data: series });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error });
  }
};

// Get Tests (all or by ID, filtered by SeriesId)
exports.getTests = async (req, res) => {
  try {
    const { id, SeriesId } = req.body;
    let whereClause = {};
    whereClause.UserId=req.user.id;
    if (id) whereClause.id = id;
    if (SeriesId) whereClause.SeriesId = SeriesId;

    const tests = await Test.findAll({ where: whereClause });

    if (id && tests.length === 0) {
      return res.status(404).json({ success: false, message: "Test not found" });
    }

    return res.status(200).json({ success: true, data: tests });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error });
  }
};

// Get Questions (all or by ID, filtered by TestId)
exports.getQuestions = async (req, res) => {
  try {
    const { id, TestId } = req.body;
    let whereClause = {};
    whereClause.UserId=req.user.id;
    if (id) whereClause.id = id;
    if (TestId) whereClause.TestId = TestId;

    const questions = await Question.findAll({ where: whereClause });

    if (id && questions.length === 0) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    return res.status(200).json({ success: true, data: questions });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error });
  }
};

// Get Options (all or by ID, filtered by QuestionId)
exports.getOptions = async (req, res) => {
  try {
    const { id, QuestionId } = req.body;
    let whereClause = {};
    whereClause.UserId=req.user.id;
    if (id) whereClause.id = id;
    if (QuestionId) whereClause.QuestionId = QuestionId;

    const options = await Option.findAll({ where: whereClause });

    if (id && options.length === 0) {
      return res.status(404).json({ success: false, message: "Option not found" });
    }

    return res.status(200).json({ success: true, data: options });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error });
  }
};
