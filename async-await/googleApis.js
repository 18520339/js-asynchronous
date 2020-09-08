const axios = require('axios');
const { config } = require('../config');
const { url, key } = config.google;

module.exports = {
	getLocation: async address => {
		try {
			const res = await axios.get(`${url}?key=${key}&address=${address}`);
			if (res.data.status === 'ZERO_RESULTS')
				throw new Error({
					message: 'Address Not Found',
					statusCode: 404,
				});
			return {
				formatted_address: res.data.results[0].formatted_address,
				lat: res.data.results[0].geometry.location.lat,
				lng: res.data.results[0].geometry.location.lng,
			};
		} catch (err) {
			if (err && err.code === 'ENOTFOUND')
				throw new Error({
					message: 'Cannot connect to maps.googleapis.com',
					statusCode: 500,
				});
			throw new Error(err);
		}
	},
};
