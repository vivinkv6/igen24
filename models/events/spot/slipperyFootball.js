const { DataTypes } = require("sequelize");
const sequelizeConfig = require("../../../config/sequelize.config");

const slipperyFootball= sequelizeConfig.define("spotFootball", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  email:{
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  college: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  mobile:{
    type: DataTypes.STRING,
    allowNull: false,
  },
});


module.exports=slipperyFootball;