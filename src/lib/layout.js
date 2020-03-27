'use strict';

/**
 * Look up the layout according to the provider name
 * @param  {string} provider provider name to look up
 * @return {object}          fields for the specified provider
 */
function getLayout(provider) {
	if (!provider) throw new Error('not ok - provider name is required');

	const providers = require('./features/providers.json');
	return providers[provider];
}

module.exports = getLayout;