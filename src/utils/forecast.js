const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ae2b27d47521572f4ad86d291ffe0a49&query=${latitude},${longitude}`;

  // request({ url: url, json: true }, (error, response) => { >>>> before destructuring
  request({ url, json: true }, (error, { body }) => {
    //>>>> after destructuring
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.success === false) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. There is a ${body.current.precip}% chance of rain. The humidity is ${body.current.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
