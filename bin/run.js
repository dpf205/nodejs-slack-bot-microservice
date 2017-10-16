'use strict';

require('dotenv');


const service = require('../server/service');
const http = require('http');

const witToken = WIT_AI_API_ACCESS_TOKEN;
const witClient = require('../server/witClient')(witToken);

const slackClient = require('../server/slackClient');
const slackToken =  SLACK_API_ACCESS_TOKEN;

const slackLogLevel = 'verbose';

const serviceRegistry = service.get('serviceRegistry')
const rtm = slackClient.init(slackToken, slackLogLevel, witClient, serviceRegistry);
rtm.start();


const server = http.createServer(service);
var port =  process.env.PORT || 3000;

slackClient.addAuthenticatedHandler(rtm, () => {
	server.listen(port, () => {
	console.log(`\nNode Slack bot microservice on port ${port}\n`); // use bunyon or winston for logging in production
});
})
