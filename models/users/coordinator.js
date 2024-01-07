const { DataTypes } = require("sequelize");
const sequelizeConfig = require("../../config/sequelize.config");

const coordinator = sequelizeConfig.define("coordinator", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = coordinator;
