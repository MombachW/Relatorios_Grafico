
const express = require('express');
const routes = express.Router();
const Ambientes = require('../Models/ambientesModel.js');

// Rota para obter todos os ambientes
routes.get('/Ambientes', async (req, res) => {
    try {
        const ambiente = await Ambientes.findAll();
        res.status(200).json(ambiente); 
        console.log(ambiente);
          
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = routes;