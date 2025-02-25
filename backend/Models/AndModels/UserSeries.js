//Purchased or Free

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../importantInfo");

const UserSeries = sequelize.define(
  "UserSeries",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isPurchased: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    tableName: "UserSeries", // Optional: specify table name if different from model name
  }
);

module.exports = UserSeries;
