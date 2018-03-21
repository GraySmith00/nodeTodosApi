const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public/stylesheets'))
app.use(express.static(__dirname + '/public/javascripts'))

const todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes);

app.get('/', function(req, res) {
    res.sendFile("index.html");
});





module.exports = app;