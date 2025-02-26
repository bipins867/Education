const {
  sequelize,
  storageUseType,
  S3_FILE_PATH,
} = require("../../../../../importantInfo");
const { v4: uuidv4 } = require("uuid");
const { saveFile } = require("../../../../../Utils/fileHandler");
const path = require("path");

const Category = require("../../../../../Models/TestSeries/Category");
const Series = require("../../../../../Models/TestSeries/Series");
const Test = require("../../../../../Models/TestSeries/Test");
const Question = require("../../../../../Models/TestSeries/Question");
const Option = require("../../../../../Models/TestSeries/Option");

// Create Category (Linked to TeacherProfile)
exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const UserId = req.user.id;
    const imageFile = req.files?.image ? req.files.image[0] : null;

    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });

    let imageData;
    if (imageFile) {
      imageData = await saveFile(
        imageFile,
        path.join("CustomFiles", "Categories"),
        uuidv4()
      );
    }
    let imageUrl = "";
    if (imageData) {
      if (storageUseType === "supabase") {
        imageUrl = `${S3_FILE_PATH}/${imageData.path}`;
      } else {
        imageUrl = imageData;
      }
    }

    const category = await Category.create({
      name,
      imageUrl,
      UserId,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

// Create Series (Linked to Category)
exports.createSeries = async (req, res, next) => {
  try {
    const { title, description, price, validity, CategoryId } = req.body;
    const imageFile = req.files?.image ? req.files.image[0] : null;

    if (!title || !CategoryId)
      return res
        .status(400)
        .json({ success: false, message: "Title and CategoryId are required" });

    // Verify Category exists
    const category = await Category.findByPk(CategoryId);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    let imageData;
    if (imageFile) {
      imageData = await saveFile(
        imageFile,
        path.join("CustomFiles", "Categories"),
        uuidv4()
      );
    }
    let imageUrl = "";
    if (imageData) {
      if (storageUseType === "supabase") {
        imageUrl = `${S3_FILE_PATH}/${imageData.path}`;
      } else {
        imageUrl = imageData;
      }
    }

    const series = await Series.create({
      title,
      description,
      price,
      validity,
      imageUrl,
      CategoryId,
    });

    return res.status(201).json({
      success: true,
      message: "Series created successfully",
      data: series,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

// Create Test (Linked to Series)
exports.createTest = async (req, res, next) => {
  try {
    const { title, type, totalQuestions, totalMarks, time, isPaid, SeriesId } =
      req.body;
    const imageFile = req.files?.image ? req.files.image[0] : null;

    if (!title || !SeriesId)
      return res
        .status(400)
        .json({ success: false, message: "Title and SeriesId are required" });

    // Verify Series exists
    const series = await Series.findByPk(SeriesId);
    if (!series)
      return res
        .status(404)
        .json({ success: false, message: "Series not found" });

    let imageData;
    if (imageFile) {
      imageData = await saveFile(
        imageFile,
        path.join("CustomFiles", "Categories"),
        uuidv4()
      );
    }
    let imageUrl = "";
    if (imageData) {
      if (storageUseType === "supabase") {
        imageUrl = `${S3_FILE_PATH}/${imageData.path}`;
      } else {
        imageUrl = imageData;
      }
    }

    const test = await Test.create({
      title,
      type,
      totalQuestions,
      totalMarks,
      time,
      isPaid,
      imageUrl,
      SeriesId,
    });

    return res.status(201).json({
      success: true,
      message: "Test created successfully",
      data: test,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

// Create Question (Linked to Test)
exports.createQuestion = async (req, res, next) => {
  try {
    const { text, weight, TestId } = req.body;
    const imageFile = req.files?.image ? req.files.image[0] : null;

    if (!text || !TestId)
      return res
        .status(400)
        .json({ success: false, message: "Text and TestId are required" });

    // Verify Test exists
    const test = await Test.findByPk(TestId);
    if (!test)
      return res
        .status(404)
        .json({ success: false, message: "Test not found" });

    let imageData;
    if (imageFile) {
      imageData = await saveFile(
        imageFile,
        path.join("CustomFiles", "Categories"),
        uuidv4()
      );
    }
    let imageUrl = "";
    if (imageData) {
      if (storageUseType === "supabase") {
        imageUrl = `${S3_FILE_PATH}/${imageData.path}`;
      } else {
        imageUrl = imageData;
      }
    }

    const question = await Question.create({ text, weight, imageUrl, TestId });

    return res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: question,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

// Create Option (Linked to Question)
exports.createOption = async (req, res, next) => {
  try {
    const { text, QuestionId } = req.body;
    const imageFile = req.files?.image ? req.files.image[0] : null;

    if (!text || !QuestionId)
      return res
        .status(400)
        .json({ success: false, message: "Text and QuestionId are required" });

    // Verify Question exists
    const question = await Question.findByPk(QuestionId);
    if (!question)
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });

    let imageData;
    if (imageFile) {
      imageData = await saveFile(
        imageFile,
        path.join("CustomFiles", "Categories"),
        uuidv4()
      );
    }
    let imageUrl = "";
    if (imageData) {
      if (storageUseType === "supabase") {
        imageUrl = `${S3_FILE_PATH}/${imageData.path}`;
      } else {
        imageUrl = imageData;
      }
    }

    const option = await Option.create({ text, imageUrl, QuestionId });

    return res.status(201).json({
      success: true,
      message: "Option created successfully",
      data: option,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};
