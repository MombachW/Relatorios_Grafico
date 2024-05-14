const database = require('../db');
const Sequelize = require('sequelize');

// Define o modelo do ambiente
const MultimedidoresModel = database.define('Multimedidores', {
    Nome: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    Data_Hora:{
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    Power_Value_Atual:{
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    Energy_Value_Atual:{
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    Total_Act_Power:{
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    Power_Value_Average:{
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    Energy_Value_Accumulated:{
        type: Sequelize.FLOAT,
        allowNull: false,
    },

    ID_Mult:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },  
 
});

module.exports = MultimedidoresModel;



