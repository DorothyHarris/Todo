require('dotenv').config();
const express = require('express');
const serverConfig = require('./config/serverConfig');
const addTodo = require('./router.js');
const getAllTodos = require('./get.router..js');

const app = express();

const { PORT } = process.env || 3000;

serverConfig(app);

app.use('/todo', addTodo);
app.use('/get', getAllTodos);

app.listen(PORT, () => console.log(`Server is up on ${PORT} port!`));
