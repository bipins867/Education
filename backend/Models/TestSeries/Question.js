const { DataTypes } = require("sequelize");
const { sequelize } = require("../../importantInfo");

const Question = sequelize.define(
  "Question",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.TEXT, allowNull: false },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true, // Image is optional
    },

    correctOptionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    weight: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 1.0 },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  { timestamps: true, tableName: "questions" }
);

module.exports = Question;
