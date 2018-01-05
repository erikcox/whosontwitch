const axios = require('axios');
const yargs = require('yargs');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
	if (response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find that address.');
	}

	var lat = response.data.results[0].geometry.location.lat;
	var lng = response.data.results[0].geometry.location.lng;
	var weatherUrl = `https://api.darksky.net/forecast/2b3e03b15cbdf36bb9c256b6c441ce85/${lat},${lng}`;
	console.log(`Weather for ${response.data.results[0].formatted_address}:`);
	return axios.get(weatherUrl);
}).then((response) => {
	var temperature = Math.floor(response.data.currently.temperature);
	var apparentTemperature = Math.floor(response.data.currently.apparentTemperature);
	var tempDiff = temperature === apparentTemperature ? '' : ` but it feels like ${apparentTemperature} F`;
	var summary  = response.data.currently.summary;
	var uv  = response.data.currently.uvIndex;
	var rain  = response.data.currently.precipProbability;
	var stormDistance = response.data.currently.nearestStormDistance;
	var storm = stormDistance === undefined ? 'There are no storms nearby.' : `The nearest storm is ${stormDistance} miles away.`;
	console.log(`It's ${summary} and ${temperature} F${tempDiff}. The UV index is ${uv}. There is a ${rain}% chance of rain. ${storm}`);
}).catch((e) => {
	if (e.code === 'ENOTFOUND') {
		console.log('Unable to connect to API servers');
	} else {
		console.log(e.message);
	}
});

// TODO: Switch between metric & imperial / F & C. Add default location if no arg passed in.