/**
 * Arquivo: app.js
 * Descrição: arquivo responsável por toda a configuração da aplicação.
 * Data: 02/03/2020
 * Author: Glaucia Lemos
 */

const express = require('express');
const cors = require('cors');
const path = require('path'); // Para ajudar a definir o caminho da pasta "public"

const app = express();

// ==> Rotas da API:
const index = require('./routes/index');
const alunoRoute = require('./routes/aluno.routes');
const provaRoute = require('./routes/prova.routes');
const avaliaRoute = require('./routes/avalia.routes');
const procuraRoute = require('./routes/procura.routes');
const solutionRoutes = require('./routes/solution.routes');

// Configurações do Express para o corpo da requisição
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

// Serve arquivos estáticos da pasta "public" para o front end
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.use(index);
app.use('/api/', alunoRoute);
app.use('/api/', provaRoute);
app.use('/api/', avaliaRoute);
app.use('/api/', procuraRoute);
app.use('/api', solutionRoutes);

module.exports = app;
