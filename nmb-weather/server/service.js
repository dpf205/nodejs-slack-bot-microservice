'use strict';
require('dotenv');

const express = require('express');
const service = express();
const request = require('superagent');
var open_weather_map_app_id = OPEN_WEATHER_MAP_APP_ID;

service.get('/service/:location', (req, res, next) => {

    request.get('http://api.openweathermap.org/data/2.5/weather?q=' +
        req.params.location + '&APPID='+ open_weather_map_app_id + '&units=metric',
        (err, response) => {

            if (err) {
                console.log(err);
                return res.sendStatus(404);
            }

            //console.log(response.body);

            res.json({ result: `${response.body.weather[0].description} at ${response.body.main.temp} degrees` });

        });
});

module.exports = service;
