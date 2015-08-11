var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({
	host: '0.0.0.0',
	port: Number(process.env.PORT)
});

server.route([
  { method: 'GET', path: '/', handler: { file: "index.html" } },
  { method: 'GET', path: '/socket.io.js', handler: { 
  	file: './node_modules/socket.io-client/socket.io.js'
  } },
  { method: 'GET', path: '/load', handler: require('./lib/load_messages').load },
  { method: 'GET', path: '/{param*}', handler: {directory: {
		path: 'public'
  } } }
]);

server.start(function () {
	require('./lib/chat').init(server.listener, function(){
		console.log(process.env.REDISCLOUD_URL);
		console.log('What do you want to talk about...?', 'listening on: http://127.0.0.1:'+process.env.PORT);
	});
});

module.exports = server;
