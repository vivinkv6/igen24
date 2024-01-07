const { DataTypes } = require("sequelize");
const sequelizeConfig = require("../../../config/sequelize.config");

const codex = sequelizeConfig.define("spotcodex", {
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
});


module.exports=codex