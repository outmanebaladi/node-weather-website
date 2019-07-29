const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9dda9f8f128ba1432bf2c6ec3aa59cab/'+latitude+','+longitude+'?units=si';
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined);
        }else if(body.error){
            callback("Unable to find location", undefined);
        }else{
            callback(undefined, body.daily.data[0].summary +" It's currently " + body.currently.temperature + " degress out. There is a " + body.currently.precipProbability+ "% chance of rain");
        }
    })
};

module.exports = forecast;