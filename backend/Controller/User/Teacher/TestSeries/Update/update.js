const { v4: uuidv4 } = require("uuid");
const { saveFile } = require("../../../../../Utils/fileHandler");
const path = require("path");
const {sequelize,
  storageUseType,
  S3_FILE_PATH,
} = require("../../../../../importantInfo");

const Category = require("../../../../../Models/TestSeries/Category");
const Series = require("../../../../../Models/TestSeries/Series");
const Test = require("../../../../../Models/TestSeries/Test");
const Question = require("../../../../../Models/TestSeries/Question");
const Option = require("../../../../../Models/TestSeries/Option");
const { createUserActivity } = require("../../../../../Utils/activityUtils");



async function updateEntity(model, req, res, fields, filePath, typeId) {
  let transaction;
  try {
    const updates = req.body;
    const imageFile = req.files?.image ? req.files.image[0] : null;

    const entity = await model.findOne({
      where: { id: req.body[typeId], InstituteId: req.institute.id },
    });
    if (!entity) {
      return res
        .status(404)
        .json({ success: false, message: "Entity not found" });
    }

    if (imageFile) {
      const imageData = await saveFile(
        imageFile,
        path.join("CustomFiles", filePath),
        uuidv4(),
        true,
        entity.imageUrl
      );
      updates.imageUrl =
        storageUseType === "supabase"
          ? `${S3_FILE_PATH}/${imageData.path}`
          : imageData;
    }

    Object.keys(updates).forEach((key) => {
      if (fields.includes(key)) {
        entity[key] = updates[key];
      }
    });
    transaction = await sequelize.transaction();

    await entity.save({ transaction });
    
    await createUserActivity(
      req,
      "update",
      `Entity updated successfully Id: ${entity.id}`,
      transaction
    );

    await transaction.commit();
    return res
      .status(200)
      .json({ success: true, message: "Updated successfully", data: entity });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
}

exports.updateCategory = (req, res) =>
  updateEntity(
    Category,
    req,
    res,
    ["name", "imageUrl"],
    "Categories",
    "CategoryId"
  );
exports.updateSeries = (req, res) =>
  updateEntity(
    Series,
    req,
    res,
    ["title", "description", "price", "validity", "CategoryId", "imageUrl"],
    "Series",
    "SeriesId"
  );
exports.updateTest = (req, res) =>
  updateEntity(
    Test,
    req,
    res,
    [
      "title",
      "type",
      "totalQuestions",
      "totalMarks",
      "time",
      "isPaid",
      "SeriesId",
      "imageUrl",
    ],
    "Tests",
    "TestId"
  );
exports.updateQuestion = (req, res) =>
  updateEntity(
    Question,
    req,
    res,
    ["text", "weight", "TestId", "imageUrl",'correctOptionId'],
    "Questions",
    "QuestionId"
  );
exports.updateOption = (req, res) =>
  updateEntity(
    Option,
    req,
    res,
    ["text", "QuestionId", "imageUrl"],
    "Options",
    "OptionId"
  );
