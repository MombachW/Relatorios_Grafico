
const express = require('express');
const routes = express.Router();
const Multimedidores = require('../Models/multimedidoresModel.js');

// Rota para obter todos os Multimedidores
routes.get('/Multimedidores', async (req, res) => {
    try {
        const multimedidores = await Multimedidores.findAll();
        res.status(200).json(multimedidores); 
          
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rota para obter um multimedidores por nome
routes.get('/Multimedidores/:nome', async (req, res) => {
    try {
      const { nome } = req.params;
      const multimedidores = await Multimedidores.findAll({
        where: {
            Nome: nome,
        },
      });
      if (!multimedidores) {
        return res.status(404).json({ message: `Não encontrado ambiente de ID ${id}` });
      }
      res.status(200).json(multimedidores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });




module.exports = routes;