const axios = require('axios');
const { config } = require('../config');
const { url, key } = config.darksky;

module.exports = {
	getSky: (lat, lng) => {
		return axios
			.get(`${url}/${key}/${lat},${lng}`)
			.then(res => {
				return Promise.resolve({
					temperature: res.data.currently.temperature,
					summary: res.data.currently.summary,
					icon: res.data.currently.icon,
				});
			})
			.catch(err => Promise.reject(err));
	},
};
