
const express = require('express');
const routes = express.Router();
const Totalizadores = require('../Models/totalizadoresModel.js');

// Rota para obter todos os Totalizadores
routes.get('/Totalizadores', async (req, res) => {
    try {
        const totalizadores = await Totalizadores.findAll();
        res.status(200).json(totalizadores); 
          
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para obter um Totalizador por nome
routes.get('/Totalizadores/:nome', async (req, res) => {
    try {
      const { nome } = req.params;
      const totalizador = await Totalizadores.findAll({
        where: {
            Nome: nome,
        },
      });
      if (!totalizador) {
        return res.status(404).json({ message: `Não encontrado ambiente de ID ${id}` });
      }
      res.status(200).json(totalizador);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });




module.exports = routes;