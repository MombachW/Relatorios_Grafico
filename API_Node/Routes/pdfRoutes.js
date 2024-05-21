const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const os = require('os');
const express = require('express');
const fetch = require('node-fetch');

const routes = express.Router();

routes.get('/pdf', async (req, res) => {
    const url = req.query.chartUrl;
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const chartImageArrayBuffer = await fetch(url).then(res => res.arrayBuffer());
    const chartImage = await pdfDoc.embedPng(chartImageArrayBuffer);

    const { width, height } = page.getSize();
    const chartWidth = width * 0.8; // Ajuste conforme necessário
    const chartHeight = (chartWidth / chartImage.width) * chartImage.height;
    const chartX = (width - chartWidth) / 2;
    const chartY = (height - chartHeight) / 2;

    page.drawImage(chartImage, {
        x: chartX,
        y: chartY,
        width: chartWidth,
        height: chartHeight
    });

    const pdfBytes = await pdfDoc.save();

    // Caminho para a pasta na área de trabalho
    const desktopPath = path.join(os.homedir(), 'Documentos', 'PDFs_Relatorios');
    
    // Cria a pasta se ela não existir
    if (!fs.existsSync(desktopPath)) {
        fs.mkdirSync(desktopPath, { recursive: true });
    }

    const filePath = path.join(desktopPath, 'chart.pdf');

    fs.writeFile(filePath, pdfBytes, (err) => {
        if (err) {
            console.error('Error saving PDF:', err);
            res.status(500).send('Error generating PDF');
            return;
        }
        console.log('PDF saved to', filePath);
        res.send('PDF Generated successfully');
    });
});

module.exports = routes;