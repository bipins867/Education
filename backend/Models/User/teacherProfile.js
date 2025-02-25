const Sequelize = require("sequelize");
const { sequelize } = require("../../importantInfo");

const TeacherProfile = sequelize.define(
  "TeacherProfile",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    qualification: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    tableName: "teacherProfile", // Explicitly defining table name
  }
);

module.exports = TeacherProfile;
