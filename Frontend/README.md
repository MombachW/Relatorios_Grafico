# Relatórios de Temperatura e Umidade

Este projeto é uma aplicação web para gerar relatórios de temperatura e umidade para diferentes ambientes. A aplicação utiliza Node.js com Express para servir arquivos estáticos e fornecer uma API backend simples.

## Estrutura do Projeto

- pm 2 para o front porta 8000:
pm2 start server.js --name frontend

- pm 2 para o backend porta 3000:
pm2 start server.js --name API