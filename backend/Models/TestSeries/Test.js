const { DataTypes } = require("sequelize");
const { sequelize } = require("../../importantInfo");

const Test = sequelize.define(
  "Test",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false }, // Test belongs to a Test Series
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "normal",
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true, // Image is optional
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    totalQuestions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    totalMarks: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    InstituteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    tableName: "tests", // Optional: specify table name if different from model name
  }
);

module.exports = Test;
