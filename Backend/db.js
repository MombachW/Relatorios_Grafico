require('dotenv').config(); // importar o dotenv para localizar as variáveis de ambiente

const Sequelize = require('sequelize');

const dbName = process.env.DB_NAME; // passar os dados do .env para as constantes
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;

const banco = new Sequelize(dbName, dbUser, dbPassword, {
  //passar os dados para o sequelize
  dialect: "mssql", //informar o tipo de banco que vamos utilizar
  host: dbHost, //o host
  port: process.env.PORT
});


module.exports = banco; //exportar
