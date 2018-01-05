const request = require('request');

var getStreamers = (user, callback) => {
	request({
		url: `https://api.twitch.tv/kraken/users/${user}/follows/channels`,
		json: true
	}, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			callback(undefined, {
				// return some shit
				// temperature: body.currently.temperature,
				// apparentTemperature: body.currently.apparentTemperature
			});
		} else {
			callback('Unable to fetch streamers.');
		}
	});
};

module.exports.getStreamers = getStreamers;