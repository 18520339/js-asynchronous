const axios = require('axios');
const { config } = require('../config');
const { url, key } = config.google;

module.exports = {
	getLocation: address => {
		return axios
			.get(`${url}?key=${key}&address=${address}`)
			.then(res => {
				if (res.data.status === 'ZERO_RESULTS')
					return Promise.reject({
						message: 'Address Not Found',
						statusCode: 404,
					}); // or throw new Error({...})
				return Promise.resolve({
					formatted_address: res.data.results[0].formatted_address,
					lat: res.data.results[0].geometry.location.lat,
					lng: res.data.results[0].geometry.location.lng,
				}); // or return {...}
			})
			.catch(err => {
				if (err && err.code === 'ENOTFOUND')
					return Promise.reject({
						message: 'Cannot connect to maps.googleapis.com',
						statusCode: 500,
					});
				return Promise.reject(err);
			});
	},
};
