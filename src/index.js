'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();

// Config
app.set('port', process.env.PORT || 4000);
app.use(morgan('dev'));
app.use(express.json());
app.use('api', require('./routes/router'));
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), () => {
	console.log('Welcome to csv file saver on port', app.get('port'));
});