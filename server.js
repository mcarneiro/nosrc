'use strict';
require('babel/register');



// if (process.env.NODE_ENV !== 'development') {
// 	require('newrelic');
// }


/*
*
*	GLOBAL path helpers
*
*/

GLOBAL.paths = require('./config/paths');

var nodeEnv = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';
var serverPort = process.env.PORT ? process.env.PORT : 3003;



/*
*
* Express
*
*/

var express = require('express');
var app = express();


/*
*
* Configuration
*
*/

require(GLOBAL.paths.getConfig('express'))(app, express);
console.log('App Environment', app.get('env'));



/*
*
* Routes
*
*/

require(GLOBAL.paths.getRoute())(app, express);



/*
*
* Server
*
*/

app.listen(app.get('port'), function() {
	console.log('');
	console.log('**************************************************');
	console.log('Express server started');
	console.log('Time: %d', Date.now());
	console.log('Port: %d', serverPort);
	console.log('Mode: %s', nodeEnv);
	console.log('PID: %s', process.pid);
	console.log('Platform: %s', process.platform);
	console.log('Arch: %s', process.arch);
	console.log('Node: %s', process.versions.node);
	console.log('V8: %s', process.versions.v8);
	console.log('**************************************************');
	console.log('');
});
