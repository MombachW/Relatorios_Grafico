
const express = require('express');
const routes = express.Router();
const Ambientes = require('../Models/ambientesModel.js');

// Rota para obter todos os ambientes
routes.get('/Ambientes', async (req, res) => {
    try {
        const ambiente = await Ambientes.findAll();
        res.status(200).json(ambiente); 
          
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para obter um ambiente por ID
routes.get('/Ambientes/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const ambiente = await Ambientes.findAll({
        where: {
            ID_Ambiente: id,
        },
      });
      if (!ambiente) {
        return res.status(404).json({ message: `Não encontrado ambiente de ID ${id}` });
      }
      res.status(200).json(ambiente);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });




module.exports = routes;