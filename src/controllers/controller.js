'use strict';
const save = require('../lib/save');
const path = require('path');

/**
 * Upload a file to the /data folder
 * @param  {object} req request
 * @param  {object} res response
 */
const uploadFile = async (req, res) => {
	const csv = `${path.resolve(__dirname,'../../')}/${req.file.path}`;
	await save(csv, req.provider);
	res.json({
		message: 'ok - data was saved sucessfully',
		body: {}
	});
};

module.exports = { uploadFile };