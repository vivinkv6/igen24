const { DataTypes } = require("sequelize");
const sequelizeConfig = require("../../config/sequelize.config");

const verifier = sequelizeConfig.define("verifier", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
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
});


module.exports=verifier