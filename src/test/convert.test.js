'use strict';

const convert = require('../lib/convert.js');
const test = require('tape').test;
const path = require('path');

test('convert - error', t => {
	t.throws(() => { convert(null) }, /Error/, 'throws an error');
	t.end();
});

test('convert - success', t => {
	const json = [];
	convert(path.resolve(__dirname, './features/x_provider.csv'))
		.on('data', (line) => {
			json.push(JSON.parse(line.toString()));
		})
		.on('end', () => {
			t.equal(json[0]['id'], '3');
			t.equal(json[0]['vin'], 'JH4TB2H26CC000000');
			t.equal(json[0]['make'], 'ACURA');
			t.equal(json[0]['model'], 'CL');
			t.equal(json[0]['age'], '2');
			t.equal(json[0]['year'], '2012');
			t.equal(json[0]['cost'], '26000');
			t.equal(json[0]['zip'], '20003');
			t.equal(json[0]['createdate'], '11/13/2018');
			t.equal(json[0]['updatedate'], '11/13/2019');

			t.equal(json.length, 5, '5 lines converted')

			t.end();
		});
});