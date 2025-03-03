const { DataTypes } = require("sequelize");
const { sequelize } = require("../../importantInfo");

const InstUser = sequelize.define(
  "InstUser",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    joinedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "instUsers",
  }
);

module.exports = InstUser;
