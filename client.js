process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

var util = require('util');

var argv = require('minimist')(process.argv.slice(2));

var socketio = require('socket.io-client');

var SERVER_HOST = argv.h || argv.host || 'https://127.0.0.1:4443';

var TOTAL_CNX 	= 10;

if (argv.c != null)
	TOTAL_CNX = argv.c;

if (argv.connections != null)
	TOTAL_CNX = argv.connections;

if (TOTAL_CNX > 0) {
	var FORCE_NEW 	= argv.f || argv.forcenew || true;

	console.log('Client settings:');
	console.log('- server host:', SERVER_HOST);
	console.log('- nb connections:', TOTAL_CNX);
	console.log('- force new:', FORCE_NEW);

	var countCnx = 0;
	var countCnxClose = 0;

	var timerId = setInterval(function() {
		if (countCnx++ >= TOTAL_CNX) {
			clearInterval(timerId);
		} else {
			var client = socketio.connect(
				// Replace with your IP
				util.format('%s/signaling', SERVER_HOST),
				{
					'forceNew' : FORCE_NEW,
					'transports': ['websocket']
				}
			);

			client.on('connect', function(obj) {
			  console.log('Connected #' + countCnx);

				client.on('message', function(data) {
			    console.log(data);
					client.close();
				});

				client.on('disconnect', function(){
				   ++countCnxClose;
					console.log('Closed connection #' + countCnxClose);
			  });
			});
		}

	}, 100);
}
