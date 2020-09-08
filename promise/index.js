const yargs = require('yargs');
const { getLocation } = require('./googleApis');
const { getSky } = require('./darkskyApis');

const argv = yargs
	.options({
		a: {
			alias: 'address',
			describe: 'Enter your address',
			demand: true,
			string: true,
		},
	})
	.help()
	.alias('help', 'h').argv;

getLocation(argv.address)
	.then(res => {
		console.log(res.formatted_address);
		return getSky(res.lat, res.lng);
	})
	.then(res => {
		console.log('Temperature:', res.temperature);
		console.log('Summary:', res.summary);
		console.log('Icon:', res.icon);
	})
	.catch(err => console.log(err));
