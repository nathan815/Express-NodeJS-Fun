// NPM Includes
const path = require('path');
const express = require('express');
//const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');

// Application Includes
const hookJWTStrategy = require('./services/passportStrategy');
const config = require('./config');

const app = express();

// Set up body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Errors
//app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 

// HTTP Logger
app.use(morgan('dev'));

// Passport
app.use(passport.initialize());
hookJWTStrategy(passport);

/*app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
*/

// Static resources at /public/
app.use(express.static(__dirname + '/../public'));

// api endpoint
app.use('/api',require('./routes/api')(passport));

app.listen(config.serverPort, (err) => {
    if (err) {
        return console.log('Server Error: ', err)
    }
    console.log('Server listening on ' + config.serverPort);
    console.log("Running in: "  + config.env);

});