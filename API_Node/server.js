require('dotenv').config(); // importar o dotenv para localizar as variáveis de ambiente
const db = require('./db');

const express = require('express');
const cors = require('cors');

//Rotas
const ambientesRoute = require('./Routes/ambientesRoutes');
const multimedidoresRoute = require('./Routes/multimedidoresRoutes');
const totalizadoresRoute = require('./Routes/totalizadoresRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", ambientesRoute);
app.use("/", multimedidoresRoute);
app.use("/", totalizadoresRoute);

//db.authenticate(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

try {
    db.sync();
    console.log(`Banco de dados conectado: ${process.env.DB_NAME}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  };

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
});


