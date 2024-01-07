const { DataTypes } = require("sequelize");
const sequelizeConfig = require("../../../config/sequelize.config");

const itQuiz = sequelizeConfig.define("spotquiz", {
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


module.exports=itQuiz