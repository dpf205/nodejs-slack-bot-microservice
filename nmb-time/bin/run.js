'use strict';

const request = require('superagent');
const service = require('../server/service');
const http = require('http');


const server = http.createServer(service);
server.listen(); // might have to specify a port to avoid conflicts

server.on('listening', function() {
    console.log(`nmb-time service is listening on ${server.address().port} in ${service.get('env')} mode.`);

    const announce = () => {
        request.put(`http://127.0.0.1:3000/service/time/${server.address().port}`, (err, res) => {
            if (err) {
                console.log(err);
                console.log("Error connecting to node-microservice Slack-bot time service");
            }
            console.log(res.body);
        });
    }
    announce();
    setInterval(announce, 15 * 1000);
});