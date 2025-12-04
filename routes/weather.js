// routes/weather.js
// Lab 9a - Calling the OpenWeather API

const express = require('express');
const request = require('request');

const router = express.Router();

// ⚠️ Replace this with your real OpenWeather API key:
const API_KEY = 'YOUR_OPENWEATHER_API_KEY_HERE';

// GET /weather?city=London
router.get('/', (req, res) => {
  const city = req.query.city || 'London';

  if (!API_KEY || API_KEY === 'YOUR_OPENWEATHER_API_KEY_HERE') {
    return res.render('weather', {
      error: 'No OpenWeather API key configured. Please edit routes/weather.js.',
      city,
      weather: null
    });
  }

  const url =
    'http://api.openweathermap.org/data/2.5/weather?q=' +
    encodeURIComponent(city) +
    '&units=metric&appid=' +
    API_KEY;

  request(url, (err, response, body) => {
    if (err) {
      return res.render('weather', {
        error: 'Error contacting weather service.',
        city,
        weather: null
      });
    }

    let weatherData;
    try {
      weatherData = JSON.parse(body);
    } catch (parseErr) {
      return res.render('weather', {
        error: 'Problem reading weather data.',
        city,
        weather: null
      });
    }

    // Handle bad city / API errors gracefully
    if (!weatherData || weatherData.cod !== 200) {
      return res.render('weather', {
        error: 'No weather found for that city.',
        city,
        weather: null
      });
    }

    const weather = {
      name: weatherData.name,
      temp: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      description: weatherData.weather[0].description
    };

    res.render('weather', {
      error: null,
      city,
      weather
    });
  });
});

module.exports = router;
