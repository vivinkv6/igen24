const { DataTypes } = require("sequelize");
const sequelizeConfig = require("../../config/sequelize.config");

const admin = sequelizeConfig.define("admin", {
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
  spotcodex: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  onlinecodex: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  spotweb: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  onlineweb: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  spotreconcile: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  onlinereconcile: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  spotgaming: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  onlinegaming: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  spotcipher: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  onlinecipher: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  spotband: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  onlineband: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  spotfootball: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  onlinefootball: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  spotinvestigation: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  onlineinvestigaton: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  spotphotography: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  onlinephotography: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  spotchoreography: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  onlinechoreography: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  spotband: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  onlineband: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = admin;
