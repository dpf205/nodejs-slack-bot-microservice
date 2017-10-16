'use strict';

const request = require('superagent');

function handleWitResponse(res){
	// console.log(res);
	return res.entities;
}

module.exports = function witClient(token){
	const ask = function ask(message, cb){

/* e.g.
 wit.ai curl \
 -H 'Authorization: Bearer 0a1b2c3d4e5f6g7h8i9jklmnopqrstuvwxyz' \
  'https://api.wit.ai/message?v=20171009&q='
  */
		request.get('https://api.wit.ai/message')
			.set('Authorization', 'Bearer ' + token)
			.query({v: '20171009'})
			.query({q: message})
			.end((err, res) => {
				if(err)  return cb(err);

				if(res.statusCode != 200) return cb('Expected status 200 but got ' + res.statusCode)

				const witResponse = handleWitResponse(res.body)
				return cb(null, witResponse);
			})

		// console.log('Asked: ' + message);
		// console.log('token: ' + token);
	}
	return {
		ask: ask
	}
}
