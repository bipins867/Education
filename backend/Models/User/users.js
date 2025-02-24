const Sequelize = require("sequelize");
const { sequelize } = require("../../importantInfo");

const User = sequelize.define(
  "User",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isDetailsUpdated: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    isBlocked: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },

    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [10, 11], // Adjust based on your requirements
      },
    },
    
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    tableName: "users", // Optional: specify table name if different from model name
  }
);

module.exports = User;
