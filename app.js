const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes);

app.get('/', function(req, res) {
    res.send('hello from root route');
});





module.exports = app;