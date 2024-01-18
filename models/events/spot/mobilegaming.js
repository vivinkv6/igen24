const { DataTypes } = require("sequelize");
const sequelizeConfig = require("../../../config/sequelize.config");

const mobileGaming= sequelizeConfig.define("spotgaming", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
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


module.exports=mobileGaming