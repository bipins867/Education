//Attempted

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../importantInfo");

const UserSeriesTestQuestion = sequelize.define(
  "UserSeriesTestQuestion",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isAttempted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    studentOptionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    tableName: "UserSeriesTestQuestions", // Optional: specify table name if different from model name
  }
);

module.exports = UserSeriesTestQuestion;
