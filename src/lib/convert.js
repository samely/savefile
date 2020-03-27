'use strict';

const { PassThrough } = require('stream');
const csvParser = require('csvtojson');
const fs = require('fs');

/**
 * Read csv files and convert them to JSON
 * @param  {string} csv CSV file path
 * @return {stream}     Stream JSONs
 */
function csvToJson(csv) {
	if (!csv) throw new Error('not ok - a csv file path is required.');
	const pass = new PassThrough();

	fs.createReadStream(csv)
		.pipe(csvParser())
		.pipe(pass)

	return pass;
}

module.exports = csvToJson;