const { DataTypes } = require("sequelize");
const sequelizeConfig = require("../../../config/sequelize.config");

const band= sequelizeConfig.define("onlineBand", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
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


module.exports=band