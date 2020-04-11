'use strict';

const express = require('express');
const morgan = require('morgan');
const db = require('./config/sequelize');

// Config
const app = express();
app.set('port', process.env.PORT || 4000);
app.use(morgan('dev'));
app.use(express.json());


db.sequelize.sync().done(() => {
	app.use('/api', require('./routes/router'));

	// Error handling
	app.use((req, res, next) => {
		const e = new Error('Endpoint not found');
		e.status = 404;
		next(e);
	});

	app.use((error, req, res, next) => {
		res.status(error.status || 500);
		res.json({
			error: {
				status: error.status,
				message: error.message
			}
		})
	});

	app.listen(app.get('port'), () => {
		console.log('Welcome to csv file saver on port', app.get('port'));
	});
});