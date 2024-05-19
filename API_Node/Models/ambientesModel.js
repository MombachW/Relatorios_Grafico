const database = require('../db');
const Sequelize = require('sequelize');

// Define o modelo do ambiente
const AmbienteModel = database.define('Ambientes', {
    ID_Ambiente:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Nome_Ambiente: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    PV_Temp:{
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    SP_Temp:{
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    PV_Umi:{
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    SP_Umi:{
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    PV_Temp:{
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    Data_Hora:{
        type: Sequelize.STRING(30),
    },
    ID_Amb:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },  
 
});

module.exports = AmbienteModel;



