const axios = require('axios');
const yargs = require('yargs');
const Preferences = require('preferences');

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