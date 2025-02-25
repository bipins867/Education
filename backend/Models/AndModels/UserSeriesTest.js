//Attempted

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../importantInfo");

const UserSeriesTest = sequelize.define(
  "UserSeriesTest",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isAttempted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    tableName: "UserSeriesTests", // Optional: specify table name if different from model name
  }
);

module.exports = UserSeriesTest;
