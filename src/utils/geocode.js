const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoia2luZ2hvd2VsbCIsImEiOiJjbDdhMDN5djkwbm5hM29zanplZzlvZGpjIn0.q9FNiyoj5y_VecotatZ8Bw`;

  // request({ url: url, json: true }, (error, response) => { >>>> before destructuring
  request({ url, json: true }, (error, { body }) => {
    //after destructuring
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
