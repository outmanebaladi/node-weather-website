const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoib3V0bWFuZWJhbGFkaSIsImEiOiJjanlkaDVuM3YwcXhuM2VwcmwwY2VqZDFzIn0.WlnUcfpOUInJOeOcNh061g&limit=1';
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to location services!", undefined);
        }else if(body.features.length === 0){
            callback("Unable to find location. Try another search.", undefined);
        }else{
            const data = {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            }
            callback(undefined, data);
        }
    });

}

module.exports = geoCode;