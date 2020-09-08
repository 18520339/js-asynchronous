const request = require('request');
const { config } = require('../config');
const { url, key } = config.darksky;

module.exports = {
	getSky: (lat, lng, callback) => {
		request.get(
			{
				url: `${url}/${key}/${lat},${lng}`,
				json: true,
			},
			(err, res, body) => {
				callback(null, {
					temperature: body.currently.temperature,
					summary: body.currently.summary,
					icon: body.currently.icon,
				});
			}
		);
	},
};
