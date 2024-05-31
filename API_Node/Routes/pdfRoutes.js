const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const os = require('os');
const express = require('express');
const fetch = require('node-fetch');

const routes = express();

routes.get('/pdf', async (req, res) => {
    const url = req.query.chartUrl; // URL do gráfico gerado externamente
    const chartName = req.query.chartName; // Nome do ambiente recebido via query
    const date = new Date().toISOString().slice(0, 10); // Data atual no formato YYYY-MM-DD

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([841.89, 595.28]); // A4 em paisagem

    const { width, height } = page.getSize();
/*
    //imagens do pdf
    const Friato_Alimentos = path.join(__dirname, '..','images', 'Friato_Alimentos.png'); // Caminho da primeira imagem
    const Install = path.join(__dirname,'..','images', 'Logo_Install.png'); // Caminho da segunda imagem

    const FriatoBytes = fs.readFileSync(Friato_Alimentos);
    const InstallBytes = fs.readFileSync(Install);

    const ImageFriato = await pdfDoc.embedPng(FriatoBytes);
    const ImageInstall = await pdfDoc.embedPng(InstallBytes);

    // Calcular posições e tamanhos
    const imageWidth = 100;
    const imageHeight = 100;

    // Posicionando as imagens
    page.drawImage(ImageFriato, {
        x: 50,
        y: height - 150,
        width: imageWidth,
        height: imageHeight
    });

    page.drawImage(ImageInstall, {
        x: 200,
        y: height - 150,
        width: imageWidth,
        height: imageHeight
    });

    */
    // Adiciona um título
    const title = `Relatório Temperatura e Umidade - ${chartName} - Dia: ${date}`;
    const titleFontSize = 16;
    page.drawText(title, {
        x: 50,
        y: height - 50,
        size: titleFontSize,
        color: rgb(0,0,0)
    });

    // Adiciona o gráfico
    const chartImageArrayBuffer = await fetch(url).then(res => res.arrayBuffer());
    const chartImage = await pdfDoc.embedPng(chartImageArrayBuffer);
    const chartWidth = width * 0.8;
    const chartHeight = (chartWidth / chartImage.width) * chartImage.height;
    const chartX = (width - chartWidth) / 2;
    const chartY = height - 100 - chartHeight;
    page.drawImage(chartImage, {
        x: chartX,
        y: chartY,
        width: chartWidth,
        height: chartHeight
    });

    // Adiciona a seção de observações
    const observations = '____________________________________________________________________________________________';
    page.drawText(observations, {
        x: width / 2 - 300,
        y: chartY - 30,
        size: 12,
        color: rgb(0,0,0)
    });

    // Adiciona a validação de garantia da qualidade
    const validation = 'Validação Garantia da Qualidade';
    page.drawText(validation, {
        x: width / 2 - 150,
        y: chartY - 50,
        size: 16,
        color: rgb(0, 0, 0)
    });

    const pdfBytes = await pdfDoc.save();
    const desktopPath = path.join(os.homedir(), 'Documents', 'PDFs_Relatorios');
    if (!fs.existsSync(desktopPath)) {
        fs.mkdirSync(desktopPath, { recursive: true });
    }

    const fileName = `${chartName.replace(/\s+/g, '_')}_${date}.pdf`;
    const filePath = path.join(desktopPath, fileName);

    fs.writeFile(filePath, pdfBytes, err => {
        if (err) {
            console.error('Error saving PDF:', err);
            res.status(500).send('Error generating PDF');
            return;
        }
        console.log('PDF saved to', filePath);
        res.send(`PDF Generated successfully and saved to ${filePath}`);
    });
});


module.exports = routes;