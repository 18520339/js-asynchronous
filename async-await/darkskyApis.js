const axios = require('axios');
const { config } = require('../config');
const { url, key } = config.darksky;

module.exports = {
	getSky: async (lat, lng) => {
		try {
			const res = await axios.get(`${url}/${key}/${lat},${lng}`);
			return {
				temperature: res.data.currently.temperature,
				summary: res.data.currently.summary,
				icon: res.data.currently.icon,
			};
		} catch (err) {
			throw new Error(err);
		}
	},
};
