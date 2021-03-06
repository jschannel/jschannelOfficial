/* jslint node: true */
'use strict';

var Hapi = require('hapi'),
	Routes = require('./routes'),
	Database = require('./config/database');
    
    
var app = {};
// app.config = Config;

var port = process.env.PORT || 5000;
var server = new Hapi.Server();
server.connection({ port: port, routes: {cors: {origin: ['*'], headers: ['Content-Type'], methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS']}}});

server.route(Routes.endpoints);

server.start(function () {
  console.log('Server started ', server.info.uri);
});