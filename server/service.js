'use strict';

const  express = require('express');
const service = express();
const ServiceRegistry = require('./serviceRegistry');
const serviceRegistry =  new ServiceRegistry();


service.set('serviceRegistry', serviceRegistry)

service.put('/service/:intent/:port', (req, res, next) => {
		const serviceIntent = req.params.intent;
		const servicePort = req.params.port;

// :: verifies it is an ipv6 address
const serviceIP = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

		serviceRegistry.add(serviceIntent, serviceIP, servicePort);
		res.json({result: `${serviceIntent} at the ipv6 address ${serviceIP}:${servicePort}`});
});

module.exports =  service;
