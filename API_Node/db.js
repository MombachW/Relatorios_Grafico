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
  port: process.env.PORT,
  define: {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
  pool: {
    max: 10,             // Número máximo de conexões no pool
    min: 0,              // Número mínimo de conexões no pool
    acquire: 30000,      // O tempo máximo, em milissegundos, que o pool tentará obter uma conexão antes de jogar erro
    idle: 10000,         // O tempo máximo, em milissegundos, que uma conexão pode estar ociosa antes de ser liberada
    evict: 1000,         // O intervalo, em milissegundos, para remover conexões ociosas
    handleDisconnects: true // Habilita o manuseio automático de desconexões
  },
  retry: {
    max: 5, // Número máximo de tentativas para tentar uma query antes de jogar erro
    match: [ // Lista de erros que devem ser tratados como motivos para nova tentativa
      Sequelize.ConnectionError,
      Sequelize.ConnectionRefusedError,
      Sequelize.ConnectionTimedOutError,
      Sequelize.TimeoutError
    ]
  }
});


module.exports = banco; //exportar