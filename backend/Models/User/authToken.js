// models/AuthToken.js

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../importantInfo");

const AuthToken = sequelize.define(
  "AuthToken",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false, // Assuming token cannot be null
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false, // Assuming type cannot be null
      defaultValue: 'default', // Optional: Set a default value
    },
  },
  {
    tableName: "authTokens", // Specify the table name
    timestamps: true, // Enable createdAt/updatedAt timestamps
  }
);

module.exports = AuthToken;
