const { DataTypes } = require("sequelize");
const { sequelize } = require("../../importantInfo");

const Banner = sequelize.define(
  "Banner",
  {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    title: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    description: { 
      type: DataTypes.TEXT, 
      allowNull: true 
    },
    imageUrl: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    type: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    isActive: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: true 
    }
  },
  { 
    timestamps: true, 
    tableName: "banners" 
  }
);

module.exports = Banner;