'use strict';
const Sequelize = require('sequelize');
const vehicle = require('../models/vehicle');

let db = null;

const config = () => {
	if (!db) {
		const sequelize = new Sequelize('sqlite::memory:');
		db = {
			Sequelize,
			sequelize,
			models: {
				vehicle: sequelize.import('../models/vehicle.js')
			}
		};
	}

	return db;
};

module.exports = config();