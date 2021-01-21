const request = require("request");

forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=a22bc25aa0ef0c1b93bb9d48d819fe6b&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "&units=m";

  request(
    {
      url,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect to weateher service.", undefined);
      } else if (body.error) {
        callback("Unable to find location", undefined);
      } else {
        const { weather_descriptions, temperature, feelslike } = body.current;
        const weatherForecast = `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`;
        callback(undefined, {
          weatherForecast,
        });
      }
    }
  );
};

module.exports = forecast;
