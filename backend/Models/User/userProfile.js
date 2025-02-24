const Sequelize = require("sequelize");
const { sequelize } = require("../../importantInfo");


const UserProfile = sequelize.define(
  "UserProfile",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true, // Ensuring email uniqueness
      validate: {
        isEmail: true, // Validates email format
      },
    },
    profileUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    rollNumber: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    studentClass: {
      // Renamed from "class" to avoid reserved keyword issues
      type: Sequelize.STRING,
      allowNull: true,
    },
    section: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    tableName: "userProfile", // Explicitly defining table name
  }
);

module.exports = UserProfile;
