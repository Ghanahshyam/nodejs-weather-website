const request = require('request');

const geocode = (address, callback) => {
    const geocodingURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?types=address&proximity=-122.39738575285674,37.792514711136945&access_token=pk.eyJ1IjoiZ2hhbmFoc2h5YW0iLCJhIjoiY2twY3Y4ajI4MG94bDJ2cnJya2s4bDk2bSJ9.F0OTwDOzlUFl8Is0YmninQ&limit=1';
    request({ url: geocodingURL, json: true}, (error, { body }) => {
      if (error) {
        callback('Unable to connect to geolocationservice!', undefined);
      } else if (!body || body.features.length === 0) {
        callback('Unable to find latitude and longitude!', undefined);
      }
      else {
        callback(undefined, {
          latitude: body.features[0].center[1], 
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
        })
      }
    })
}
  

  module.exports = geocode;