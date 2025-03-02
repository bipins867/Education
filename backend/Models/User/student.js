const Sequelize = require("sequelize");
const { sequelize } = require("../../importantInfo");


const Student = sequelize.define(
  "Student",
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
    tableName: "student", // Explicitly defining table name
  }
);

module.exports = Student;
