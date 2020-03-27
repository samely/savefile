'use strict';

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database(':memory:');
const convert = require('./convert');
const layout = require('./layout');

function savedb(csvPath, layout) {
	db.serialize(() => {
		db.run(
			`CREATE TABLE IF NOT EXISTS vehicle (
			uuid INT PRIMARY KEY,
			vin VARCHAR(20),
			make VARCHAR(20),
			model VARCHAR(20),
			mileage DECIMAL(10,2),
			year INT,
			price DECIMAL(6,2),
			zipcode VARCHAR(9),
			createdate TIMESTAMP,
			updatedate TIMESTAMP
		)`
		);

		const insert = db.prepare('INSERT INTO vehicle VALUES(?,?,?,?,?,?,?,?,?,?)');

		convert(csvPath)
			.on('data', (fields) => {
				fields = JSON.parse(fields.toString());
				insert.run(
					fields[layout['uuid']],
					fields[layout['vin']],
					fields[layout['make']],
					fields[layout['model']],
					fields[layout['mileage']],
					fields[layout['year']],
					fields[layout['price']],
					fields[layout['zipcode']],
					fields[layout['createdate']],
					fields[layout['updatedate']]
				);
			})
			.on('end', () => {
				console.log('ok - finished inserting data.');
				insert.finalize();
				db.close();

				// db.all('SELECT * FROM vehicle', (err, row) => {
				// 	console.log(err)
				// 	db.close();
				// });

			});
	});


}

function save(csvPath, provider) {
	if (!csvPath) throw new Error('not ok - csv path is required.');
	if (!provider) throw new Error('not ok - provider name is required.');

	const layoutConf = layout(provider);
	savedb(csvPath, layoutConf);
}

module.exports = save;