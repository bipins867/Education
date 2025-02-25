const { DataTypes } = require("sequelize");
const { sequelize } = require("../../importantInfo");

const Series = sequelize.define(
  "Series",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true, // Image is optional
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    validity: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: { type: DataTypes.TEXT },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    tableName: "Series", // Optional: specify table name if different from model name
  }
);

module.exports = Series;
