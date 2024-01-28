const { DataTypes } = require("sequelize");
const sequelizeConfig = require("../../config/sequelize.config");

const eventModel = sequelizeConfig.define("onlineevents", {
  chessno: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  participant: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  email: {
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
    allowNull: false,
    unique: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports=eventModel