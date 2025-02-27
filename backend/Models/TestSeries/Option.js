const { DataTypes } = require("sequelize");
const { sequelize } = require("../../importantInfo");

const Option = sequelize.define(
  "Option",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING, allowNull: false },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true, // Image is optional
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  { timestamps: true, tableName: "options" }
);

module.exports = Option;
