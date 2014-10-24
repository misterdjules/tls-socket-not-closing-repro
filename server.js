var fs = require('fs');
var util = require('util');

var socketIO 		= require('socket.io');

var argv = require('minimist')(process.argv.slice(2));

var SERVER_PORT = argv.p || argv.port || 4443;
var PROTOCOL = argv.protocol || 'https';

var options = undefined;
if (PROTOCOL === 'https') {
	options =	{
		key: 	fs.readFileSync('cert/agent.key'),
		cert: fs.readFileSync('cert/agent.crt')
	};
}

var server = require(PROTOCOL).createServer(options);
server.listen(SERVER_PORT, function() {
	console.log(util.format('%s server listening on port [%s]',
													PROTOCOL,
													SERVER_PORT));
});

var sioInstance = socketIO.listen(server);

var cnx = 0;

sioInstance.of('/signaling')
	.on('connection', function(socket) {

		console.log('Total Cnx #: ' + ++cnx);

		socket.on('disconnect', function() {
			console.log('Disconnect');
		});

		socket.emit('message', { 'message' : 'Hello' });
	});
