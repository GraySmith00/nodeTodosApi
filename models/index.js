const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

module.exports.Todo = require('./Todo');