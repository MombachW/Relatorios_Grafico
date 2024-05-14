const database = require('../db');
const Sequelize = require('sequelize');

// Define o modelo do ambiente
const TotalizadoresModel = database.define('Totalizadores', {
    Descricao: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    Tag: {
        type: Sequelize.STRING(12),
        allowNull: false,
    },
    Data_Hora: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    Totalizado: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    ID_Tot:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },  
 
});

module.exports = TotalizadoresModel;



