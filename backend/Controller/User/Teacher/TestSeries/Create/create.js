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
const { createUserActivity } = require("../../../../../Utils/activityUtils");

exports.createCategory = async (req, res, next) => {
  let transaction;
  try {
    const { name } = req.body;
    const institute = req.institute;

    const InstituteId = institute.id;
    const imageFile = req.files?.image ? req.files.image[0] : null;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

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

    transaction = await sequelize.transaction();

    const category = await Category.create(
      {
        name,
        imageUrl,
        InstituteId,
      },
      { transaction }
    );

    await createUserActivity(
      req,
      "create",
      `Category created successfully Id: ${category.id}`,
      transaction
    );

    await transaction.commit();
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.error("Error creating category:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.createSeries = async (req, res, next) => {
  let transaction;
  try {
    const { title, description, price, validity, CategoryId } = req.body;
    const imageFile = req.files?.image ? req.files.image[0] : null;

    if (!title || !CategoryId)
      return res
        .status(400)
        .json({ success: false, message: "Title and CategoryId are required" });

    // Verify Category exists
    const category = await Category.findOne({
      where: {
        id: CategoryId,
        UserId: req.user.id,
      },
    });
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

    transaction = await sequelize.transaction();

    const series = await Series.create(
      {
        title,
        description,
        price,
        validity,
        imageUrl,
        CategoryId,
        InstituteId: req.institute.id,
      },
      { transaction }
    );

    await createUserActivity(
      req,
      "create",
      `Series created successfully Id: ${series.id}`,
      transaction
    );
    await transaction.commit();
    return res.status(201).json({
      success: true,
      message: "Series created successfully",
      data: series,
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

exports.createTest = async (req, res, next) => {
  let transaction;
  try {
    const { title, type, totalQuestions, totalMarks, time, isPaid, SeriesId } =
      req.body;
    const imageFile = req.files?.image ? req.files.image[0] : null;

    if (!title || !SeriesId)
      return res
        .status(400)
        .json({ success: false, message: "Title and SeriesId are required" });

    // Verify Series exists
    const series = await Series.findOne({
      where: {
        id: SeriesId,
        UserId: req.user.id,
      },
    });
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

    transaction = await sequelize.transaction();

    const test = await Test.create(
      {
        title,
        type,
        totalQuestions,
        totalMarks,
        time,
        isPaid,
        imageUrl,
        SeriesId,
        InstituteId: req.institute.id,
      },
      { transaction }
    );

    await createUserActivity(
      req,
      "create",
      `Test created successfully Id: ${test.id}`,
      transaction
    );
    await transaction.commit();
    return res.status(201).json({
      success: true,
      message: "Test created successfully",
      data: test,
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

exports.createQuestion = async (req, res, next) => {
  let transaction;
  try {
    const { text, weight, TestId } = req.body;
    const imageFile = req.files?.image ? req.files.image[0] : null;

    if (!text || !TestId)
      return res
        .status(400)
        .json({ success: false, message: "Text and TestId are required" });

    // Verify Test exists
    const test = await Test.findOne({
      where: {
        id: TestId,
        UserId: req.user.id,
      },
    });
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

    transaction = await sequelize.transaction();

    const question = await Question.create(
      {
        text,
        weight,
        imageUrl,
        TestId,
        InstituteId: req.institute.id,
      },
      { transaction }
    );

    await createUserActivity(
      req,
      "create",
      `Question created successfully Id: ${question.id}`,
      transaction
    );
    await transaction.commit();
    return res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: question,
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

exports.createOption = async (req, res, next) => {
  let transaction;
  try {
    const { text, QuestionId } = req.body;
    const imageFile = req.files?.image ? req.files.image[0] : null;

    if (!text || !QuestionId)
      return res
        .status(400)
        .json({ success: false, message: "Text and QuestionId are required" });

    // Verify Question exists
    const question = await Question.findOne({
      where: {
        id: QuestionId,
        UserId: req.user.id,
      },
    });
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

    transaction = await sequelize.transaction();

    const option = await Option.create(
      {
        text,
        imageUrl,
        QuestionId,
        InstituteId: req.institute.id,
      },
      { transaction }
    );

    await createUserActivity(
      req,
      "create",
      `Option created successfully Id: ${option.id}`,
      transaction
    );
    await transaction.commit();
    return res.status(201).json({
      success: true,
      message: "Option created successfully",
      data: option,
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};
