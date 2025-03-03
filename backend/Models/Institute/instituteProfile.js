const { DataTypes } = require("sequelize");
const { sequelize } = require("../../importantInfo");

const InstituteProfile = sequelize.define(
  "InstituteProfile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "instituteProfiles",
  }
);

module.exports = InstituteProfile;
