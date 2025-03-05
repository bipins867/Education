const { DataTypes } = require("sequelize");
const { sequelize } = require("../../importantInfo");

const StudentQuestion = sequelize.define(
  "StudentQuestion",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    selectedOptionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    StudentTestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "studentQuestions",
  }
);

module.exports = StudentQuestion;
