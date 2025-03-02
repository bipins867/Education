const { DataTypes } = require("sequelize");
const { sequelize } = require("../../importantInfo");

const StudentTeacher = sequelize.define(
  "StudentTeacher",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: true,
    tableName: "studentTeachers",
  }
);

module.exports = StudentTeacher;
