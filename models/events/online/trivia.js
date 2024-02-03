const { DataTypes } = require("sequelize");
const sequelizeConfig = require("../../../config/sequelize.config");

const trivia = sequelizeConfig.define("onlinetrivia", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.ARRAY(DataTypes.STRING) ,
    allowNull: true,
  },
  name: {
    type: DataTypes.ARRAY(DataTypes.STRING) ,
    allowNull: true,
  },
  college: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  mobile:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  transactionid: {
    type: DataTypes.STRING,
    allowNull:false,
    unique:true
  },
  payment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


module.exports=trivia