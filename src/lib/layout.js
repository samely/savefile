'use strict';

/**
 * Look up the layout according to the provider name
 * @param  {string} provider provider name to look up
 * @return {object}          fields for the specified provider
 */
function getLayout(provider) {
	return new Promise((resolve, reject) => {
		if (!provider) return reject(new Error('not ok - provider name is required.'));

		const providers = require('./features/providers.json');
		const layout = providers[provider];

		if (!layout) return reject(new Error('not ok - layout not found.'));
		return resolve(layout);
	});
}

module.exports = getLayout;