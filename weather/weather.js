const request = require('request');


var apiKey = "6fe21a2c9f9d63b45893d369686e35c8";
var getWeather = (lat, lng, callback) => {
    request({
            url: `https://api.forecast.io/forecast/${apiKey}/${lat},${lng}`,
            json: true
            }, (error, response, body) => {
                if (response.statusCode === 200) {
                    callback(undefined,{
                        temp: body.currently.temperature,
                        appTemp: body.currently.apparentTemperature
                    });
                }
                else {

                   callback('Unable to connect to Forecast servers' + body.currently.temperature);
                }
            }
            )
}

module.exports.getWeather = getWeather;