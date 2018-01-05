const axios = require('axios');
const yargs = require('yargs');
const Preferences = require('preferences');

// r8m2ythybi3pglj414el917hfjqytm

// TODO: figure out how to trim the text here
const argv = yargs
	.options({
		u: {
			//demand: true,
			alias: 'user',
			describe: 'Twitch user to fetch streamer list for',
			string: true
		},
		k: {
			alias: 'key',
			describe: 'Twitch client ID from https://www.twitch.tv/kraken/oauth2/clients/new',
			string: true
		},
		c: {
			alias: 'color',
			describe: 'Toggle text colors',
			boolean: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

let prefs = new Preferences('whosontwitch', {
	api_key: '',
	user: '',
	color: true
});

if (argv.user !== undefined) {
	prefs.user = argv.user;
}

if (argv.key !== undefined) {
	prefs.api_key = argv.key;
}

if (argv.color !== undefined) {
	prefs.color = argv.color;
}


console.log(prefs);

/*
if (prefs.api_key) {
	// pass
} else {
	// prompt user to enter api with instructions
}

if (prefs.user) {
	// show streamers the user follows
} else {
	// show the top streamers worldwide
}

axios.get(user).then((response) => {
	if (response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find that user.');
	}

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
*/