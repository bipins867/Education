// Make sure to import sequelize instance
const Category = require("../../../../../Models/TestSeries/Category");
const Series = require("../../../../../Models/TestSeries/Series");
const Test = require("../../../../../Models/TestSeries/Test");
const Question = require("../../../../../Models/TestSeries/Question");
const Option = require("../../../../../Models/TestSeries/Option");
const { deleteFile } = require("../../../../../Utils/subaseS3");
const { sequelize } = require("../../../../../importantInfo");
const { createUserActivity } = require("../../../../../Utils/activityUtils");

// Helper function to delete image if exists
async function deleteEntityImage(entity) {
  if (entity.imageUrl) {
    await deleteFile(entity.imageUrl);
  }
}

exports.deleteCategory = async (req, res, next) => {
  let t;
  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Category ID is required" });
    }

    const category = await Category.findOne({
      where: { id: id, UserId: req.user.id },
    });

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    t = await sequelize.transaction();

    const series = await Series.findAll({
      where: { CategoryId: id },
    });

    for (const serie of series) {
      const tests = await Test.findAll({
        where: { SeriesId: serie.id },
      });

      for (const test of tests) {
        const questions = await Question.findAll({
          where: { TestId: test.id },
        });

        for (const question of questions) {
          const options = await Option.findAll({
            where: { QuestionId: question.id },
          });

          for (const option of options) {
            await deleteEntityImage(option);
            await option.destroy({ transaction: t });
          }

          await deleteEntityImage(question);
          await question.destroy({ transaction: t });
        }

        await deleteEntityImage(test);
        await test.destroy({ transaction: t });
      }

      await deleteEntityImage(serie);
      await serie.destroy({ transaction: t });
    }

    await deleteEntityImage(category);
    await category.destroy({ transaction: t });

    await createUserActivity(
      req,
      "delete",
      `Category deleted successfully Id: ${category.id}`,
      t
    );

    await t.commit();
    return res.status(200).json({
      success: true,
      message: "Category and all associated content deleted successfully",
    });
  } catch (error) {
    if (t) {
      await t.rollback();
    }
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

exports.deleteSeries = async (req, res, next) => {
  let t;

  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Series ID is required" });
    }
    const series = await Series.findOne({
      where: { id: id, UserId: req.user.id },
    });

    if (!series) {
      return res
        .status(404)
        .json({ success: false, message: "Series not found" });
    }

    const tests = await Test.findAll({
      where: { SeriesId: id },
    });

    t = await sequelize.transaction();

    for (const test of tests) {
      const questions = await Question.findAll({
        where: { TestId: test.id },
      });

      for (const question of questions) {
        const options = await Option.findAll({
          where: { QuestionId: question.id },
        });

        for (const option of options) {
          await deleteEntityImage(option);
          await option.destroy({ transaction: t });
        }

        await deleteEntityImage(question);
        await question.destroy({ transaction: t });
      }

      await deleteEntityImage(test);
      await test.destroy({ transaction: t });
    }

    await deleteEntityImage(series);
    await series.destroy({ transaction: t });

    await createUserActivity(
      req,
      "delete",
      `Series deleted successfully Id: ${series.id}`,
      t
    );

    await t.commit();
    return res.status(200).json({
      success: true,
      message: "Series and all associated content deleted successfully",
    });
  } catch (error) {
    if (t) {
      await t.rollback();
    }
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

exports.deleteTest = async (req, res, next) => {
  let t;

  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Test ID is required" });
    }
    const test = await Test.findOne({
      where: { id: id, UserId: req.user.id },
      transaction: t,
    });

    if (!test) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found" });
    }

    const questions = await Question.findAll({
      where: { TestId: id },
      transaction: t,
    });

    t = await sequelize.transaction();
    for (const question of questions) {
      const options = await Option.findAll({
        where: { QuestionId: question.id },
      });

      for (const option of options) {
        await deleteEntityImage(option);
        await option.destroy({ transaction: t });
      }

      await deleteEntityImage(question);
      await question.destroy({ transaction: t });
    }

    await deleteEntityImage(test);
    await test.destroy({ transaction: t });

    await createUserActivity(
      req,
      "delete",
      `Test deleted successfully Id: ${test.id}`,
      t
    );

    await t.commit();
    return res.status(200).json({
      success: true,
      message: "Test and all associated content deleted successfully",
    });
  } catch (error) {
    if (t) {
      await t.rollback();
    }
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

exports.deleteQuestion = async (req, res, next) => {
  let t;

  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Question ID is required" });
    }
    const question = await Question.findOne({
      where: { id: id, UserId: req.user.id },
    });

    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

    t = await sequelize.transaction();

    const options = await Option.findAll({
      where: { QuestionId: id },
    });

    for (const option of options) {
      await deleteEntityImage(option);
      await option.destroy({ transaction: t });
    }

    await deleteEntityImage(question);
    await question.destroy({ transaction: t });

    await createUserActivity(
      req,
      "delete",
      `Question deleted successfully Id: ${question.id}`,
      t
    );
    await t.commit();
    return res.status(200).json({
      success: true,
      message: "Question and all associated options deleted successfully",
    });
  } catch (error) {
    if (t) {
      await t.rollback();
    }
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

exports.deleteOption = async (req, res, next) => {
  let t;

  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Option ID is required" });
    }
    const option = await Option.findOne({
      where: { id: id, UserId: req.user.id },
    });

    if (!option) {
      return res
        .status(404)
        .json({ success: false, message: "Option not found" });
    }

    t = await sequelize.transaction();

    await deleteEntityImage(option);
    await option.destroy({ transaction: t });

    await createUserActivity(
      req,
      "delete",
      `Option deleted successfully Id: ${option.id}`,
      t
    );
    await t.commit();
    return res
      .status(200)
      .json({ success: true, message: "Option deleted successfully" });
  } catch (error) {
    if (t) {
      await t.rollback();
    }

    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};
