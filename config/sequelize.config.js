require('dotenv').config();
const {Sequelize}=require('sequelize');

// const sequelizeConfig=new Sequelize({
//     database:process.env.DATABASE,
//     username:process.env.USERNAME,
//     password:process.env.PASSWORD,
//     host:process.env.HOST,
//     port:process.env.DBPORT,
//     dialect:"postgres"
// })

const sequelizeConfig=new Sequelize(process.env.DBURL);

module.exports=sequelizeConfig;