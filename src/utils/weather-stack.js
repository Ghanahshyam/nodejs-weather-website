const request = require('request');

const forecast = (coordintes, callback ) => {
    const url = 'http://api.weatherstack.com/current?access_key=2d946695d814031eb963df3d224f07e8&query='+ coordintes[0]+','+coordintes[1]+'&units=m';

    request({ url, json: true }, (error, {body}) => {
        if (error) {
          callback('Unable to connect to weather servie!', undefined);
        } else if (body.error) {
          callback('Unable to find location!', undefined);
        }
        else {
          const current = body.current;
          callback(undefined, current.weather_descriptions[0] + '. It is currently '+current.temperature+' degrees out. There it feels like '+current.feelslike);      
        }
    })
}

module.exports =  forecast;