const yargs = require('yargs');
const { getLocation } = require('./googleApis');
const { getSky } = require('./darkskyApis');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Enter your address',
			string: true,
		},
	})
	.help()
	.alias('help', 'h').argv;

getLocation(argv.address, (err, res) => {
	if (err) return console.log(err);
	console.log(res.formatted_address);
	getSky(res.lat, res.lng, (err, res) => {
		if (err) return console.log(err);
		console.log('Temperature:', res.temperature);
		console.log('Summary:', res.summary);
		console.log('Icon:', res.icon);
	});
});
