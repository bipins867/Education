const { DataTypes } = require("sequelize");
const { sequelize } = require("../../importantInfo");

const Category = sequelize.define(
  "Category",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true, // Image is optional
    },

    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { timestamps: true, tableName: "categories" }
);

module.exports = Category;
