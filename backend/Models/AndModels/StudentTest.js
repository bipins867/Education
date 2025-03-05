const { DataTypes } = require("sequelize");
const { sequelize } = require("../../importantInfo");

const StudentTest = sequelize.define(
  "StudentTest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    startTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    totalScore: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    totalAttempted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    correctAnswers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    wrongAnswers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    timeTaken: {
      type: DataTypes.INTEGER, // in seconds
      defaultValue: 0,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "studentTests",
  }
);

module.exports = StudentTest;
