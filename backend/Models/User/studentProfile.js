const Sequelize = require("sequelize");
const { sequelize } = require("../../importantInfo");


const StudentProfile = sequelize.define(
  "StudentProfile",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    tableName: "studentProfile", // Explicitly defining table name
  }
);

module.exports = StudentProfile;
