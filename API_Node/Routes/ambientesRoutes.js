
const express = require('express');
const routes = express.Router();
const Ambientes = require('../Models/ambientesModel.js');
const { Sequelize } = require('sequelize');

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


routes.get('/Ambientes/Filtro/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.query;
        const whereConditions = {
            ID_Ambiente: id,
        };

        if (data) {
            whereConditions.Data_Inserido = data;
        }

        const ambiente = await Ambientes.findAll({
            where: whereConditions,
        });

        if (!ambiente.length) {
            return res.status(404).json({ message: `Não encontrado ambiente de ID ${id}` });
        }

        res.status(200).json(ambiente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


routes.get('/search', async (req, res) => {
    const searchTerm = req.query.term;
    try {
        const ambiente = await Ambientes.findAll({
            where: {
                Nome_Ambiente: {
                    [Sequelize.Op.iLike] : `%${searchTerm}%`
                }
            },
            atributes: ['Nome_Ambiente']
        });
        res.json(ambiente);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = routes;