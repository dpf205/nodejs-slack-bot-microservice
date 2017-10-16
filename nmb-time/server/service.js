'use strict';

require('dotenv');

const express = require('express');
const service = express();
const request = require('superagent');
const moment = require('moment');


var google_maps_api_key = GOOGLE_MAPS_API_KEY;
var google_maps_timezone_api_key = GOOGLE_MAPS_TIMEZONE_API_KEY;

service.get('/service/:location', (req, res, next) => {

    // obtain coordinates
    request.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + req.params.location + '&key=' + google_maps_api_key, (err, response) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        const location = response.body.results[0].geometry.location;
        const timestamp = +moment().format('X'); // + means an integer is returned, 'X' is shortcut for unix timestamp

        // use  coordinates to get time for a given location
        request.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + location.lat + ',' + location.lng + '&timestamp=' + timestamp + '&key=' + google_maps_timezone_api_key, (err, response) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            const result = response.body;
            const timeString = moment.unix(timestamp + result.dstOffset + result.rawOffset).utc().format('dddd, MMMM Do YYYY, h:mm:ss a');

            res.json({ result: timeString })
        });
    });
});

module.exports = service;
