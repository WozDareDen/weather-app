const yargs = require('yargs'),

        geocode = require('./geocode/geocode'),
        weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMessage,results)=>{
    if(errorMessage){
        console.log(errorMessage);
    }
    else{
        console.log(results.address);
        weather.getWeather(results.lat, results.lng, (errorMessage, weatherResults) => {
            if(errorMessage){
                console.log(errorMessage);
            }
            else{
                var newTemp = (weatherResults.temp - 32)/ 1.8
                var newAppTemp = (weatherResults.appTemp - 32)/ 1.8
                console.log(`It's currently ${newTemp}. And it feels like ${newAppTemp}.`);
            }
        });
    }
});

