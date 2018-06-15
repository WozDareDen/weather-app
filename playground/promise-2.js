const request = require('request');

let geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        let encodedAddress = encodeURIComponent(address);
        request({
            url: `https://maps.google.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        },(error,response,body) =>{
            if(error){
                reject('Unable to connect to Google servers');
            }
            else if(body.status === 'ZERO RESULTS'){
                reject('Unable to find that address');
            }
            else if(body.status === 'OK'){
                resolve({
                    address: body.results[0].formatted_address,
                    lat: body.results[0].geometry.location.lat,
                    lng: body.results[0].geometry.location.lng
                });
            }
        });
    });
};

geocodeAddress('00000').then((location)=> {
    console.log(JSON.stringify(location,undefined,2))
}, (errorMessage) =>{
    console.log(errorMessage);
});








