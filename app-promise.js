const yargs = require('yargs'),
    axios = require('axios'),

    geocode = require('./geocode/geocode'),
    weather = require('./weather/weather');

let apiKey =  "6fe21a2c9f9d63b45893d369686e35c8";
const argv = yargs
    .options({
        a:{
            demand: true,
            alias: 'address',
            describe: 'Address to fecth weather for',
            string: true
        }
    })
    .help()
    .alias('help','h')
    .argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.google.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address.');
    }
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    let weatherUrl = `https://api.forecast.io/forecast/${apiKey}/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    let temperature = (response.data.currently.temperature - 32)/1.8;
    let apparentTemperature = (response.data.currently.apparentTemperature - 32)/1.8;
    console.log(`Il fait ${temperature} et le ressenti est de ${apparentTemperature}.`);
    console.log(`Le ciel est ${response.data.currently.summary}.`);
}).catch((e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API servers.')
    }else{
        console.log(e.message);
    }

});
