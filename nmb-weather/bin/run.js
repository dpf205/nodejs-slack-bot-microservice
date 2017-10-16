'use strict';
const request = require('superagent');
const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);
server.listen(8080); // might have to specify a port to avoid conflicts

server.on('listening', function() {
    console.log(`NMB-Weather is listening on ${server.address().port} in ${service.get('env')} mode.`);

    const announce = () => {
        request.put(`http://127.0.0.1:3000/service/weather/${server.address().port}`, (err, res) => {
            if (err) {
                console.log(err);
                console.log("Error connecting to node-microservice Slack-bot time service");
            }
        });
    };
    announce();
    setInterval(announce, 15 * 1000);
});