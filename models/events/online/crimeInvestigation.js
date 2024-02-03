const { DataTypes } = require("sequelize");
const sequelizeConfig = require("../../../config/sequelize.config");

const crimeInvestigation = sequelizeConfig.define("onlineci", {
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
  transactionid: {
    type: DataTypes.STRING,
    allowNull:false,
    unique:true
  },
  mobile:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


module.exports=crimeInvestigation