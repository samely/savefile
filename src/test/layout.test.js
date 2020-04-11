'use strict';

const layout = require('../lib/layout.js');
const test = require('tape').test;
const path = require('path');

test('layout - error', t => {
	layout().catch(e => {
		t.equal(e.message, 'not ok - provider name is required.', 'returns an error');
		t.end();
	})
});

test('layout - success', t => {
	layout('y')
		.then(getLayout => {
			t.deepEqual(getLayout, {
				'uuid': 'uid',
				'vin': 'vin',
				'make': 'make',
				'model': 'models',
				'mileage': 'mile',
				'year': 'year',
				'price': 'price',
				'zipcode': 'code',
				'createdate': 'create',
				'updatedate': 'update'
			}, 'provider as expected');

			t.end();
		})
		.catch(e => {});
});