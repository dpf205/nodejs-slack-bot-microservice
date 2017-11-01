``## Slack Real-time Messaging API (get api key here)
> https://api.slack.com/rtm

## Slack Developer Kit for Node.js
> https://slackapi.github.io/node-slack-sdk/

## Obtain google maps api key:
> // https://developers.google.com/maps/documentation/geocoding/start

## Obtain google maps timezone api key:
> https://developers.google.com/maps/documentation/timezone/start

## Local Setup (run three scripts below)
> nmp install in root, in ../nmb-time, and in ../nmb-weather

> in root, node bin/run.js

> node nmb-time/bin/run.js

> node nmb-weather/bin/run.js

> message to slack bot must contain "nmb", change in handleOnMessage() in ../server/slackClient.js

> dotenv package is used: require('dotenv') in  ../nmb-time/server/service.js, ../nmb-weather/server/service.js, and ../bin/run.js
