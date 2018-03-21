const mongoose = require('mongoose');

// import env variables from variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
    console.error(`UH OHHHHH -> ${err.message}`);
});




// start the app!
const app = require('./app');
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), process.env.IP, function() {
    console.log(`Server is up and cookin! -> PORT ${server.address().port}`);
});