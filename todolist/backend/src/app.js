const express = require('express');
const cors = require('cors');
const router = require('./router.js');

const app = express();

app.use(cors()); // Habilita o CORS antes das rotas
app.use(express.json()); // Faz a API aceitar dados JSON
app.use(router);

module.exports = app;