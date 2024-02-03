const { DataTypes } = require("sequelize");
const sequelizeConfig = require("../../../config/sequelize.config");

const photography= sequelizeConfig.define("spotPhotographpy", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  college: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile:{
    type: DataTypes.STRING,
    allowNull: false,
  },
});


module.exports=photography;