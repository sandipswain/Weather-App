const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=92b7eeca19aff53757c436c732ebcbbc&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      //   console.log("Unable to log to Weather Services!");
      callback("Unable to log to Weather Services!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `It's ${body.current.weather_descriptions[0]}. It's currently ${body.current.temperature}°F out but feels like ${body.current.feelslike}°F. It's ${body.current.humidity}% humid.`
      );
    }
  });
};

module.exports = forecast;
