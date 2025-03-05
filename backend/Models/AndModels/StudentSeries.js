//Purchased or Free

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../importantInfo");

const StudentSeries = sequelize.define(
  "StudentSeries",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isPurchased: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    validity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "in days",
    },
    purchasedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    tableName: "studentSeries", // Optional: specify table name if different from model name
  }
);

module.exports = StudentSeries;
