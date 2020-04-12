'use strict';

function setUp(sequelize, DataTypes) {
	return sequelize.define('Vehicle', {
		uuid: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		vin: { type: DataTypes.STRING },
		make: { type: DataTypes.STRING },
		model: { type: DataTypes.STRING },
		mileage: { type: DataTypes.DECIMAL(10, 2) },
		year: { type: DataTypes.INTEGER },
		price: { type: DataTypes.DECIMAL(10, 2) },
		zipcode: { type: DataTypes.STRING },
		createdate: { type: DataTypes.DATE },
		updatedate: { type: DataTypes.DATE },
		provider: { type: DataTypes.STRING}
	});
}

module.exports = setUp;