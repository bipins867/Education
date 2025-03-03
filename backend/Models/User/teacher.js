const Sequelize = require("sequelize");
const { sequelize } = require("../../importantInfo");

const Teacher = sequelize.define(
  "Teacher",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    qualification: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    isDetailsUpdated: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    tableName: "teacher", // Explicitly defining table name
  }
);

module.exports = Teacher;
