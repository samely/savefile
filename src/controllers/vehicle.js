'use strict';
const path = require('path');
const Transform = require('stream').Transform;
const convert = require('../lib/convert');
const getlayout = require('../lib/layout');
const vehicle = require('../config/sequelize').models.vehicle;


const processData = new Transform({ objectMode: true });

/**
 * Insert data into the database
 * @param  {object} req request
 * @param  {object} res response
 */
const uploadFile = async (req, res) => {
	if (!req.body.provider || !req.file) {
		res.status(400).json({ message: 'not ok - request parameter is not valid.' });
		return;
	}
	const provider = req.body.provider;
	let layout;

	try {
		layout = await getlayout(provider);
	} catch (e) {
		res.status(412).json({ message: 'not ok - layout for provider does not exist.' });
		return;
	}

	processData.layout = layout;
	processData._transform = function(lines, encoding, done) {
		if (!this.layout) return done(new Error('not ok - layout is required.'));
		lines = JSON.parse(lines.toString());

		const data = {};
		Object.keys(this.layout).forEach(field => {
			data[`${field}`] = lines[this.layout[field]];
		});

		data.provider = provider;

		vehicle.create(data).then(() => done()).catch(e => done(e));
	};

	const csv = `${path.resolve(__dirname,'../../')}/${req.file.path}`;
	const streamData = convert(csv);
	streamData
		.pipe(processData)
		.on('finish', () => {
			res.status(200).json({ message: 'ok - data was sucessfully uploaded.' });
		})
		.on('error', e => {
			res.status(412).json({ message: e.message });
			streamData.end();
		});
};

/**
 * List elements from the database
 * @param  {object} req request
 * @param  {object} res response
 */
const listVehicles = (req, res) => {
	vehicle.findAll()
		.then(result => { res.status(200).json(result) })
		.catch(e => res.status(412).json({ message: e.message }))
};

module.exports = { uploadFile, listVehicles };