var express = require('express');
var socket = require('socket.io');
var app = express();

app.use(express.static('game'));

var server = app.listen(8000, () => {
    console.log("Listening for requests on port: 8000");
});

var io = socket(server);

var users = [];

io.on('connection', (socket) => {
	users.push(socket.id);
	
	console.log("Made connection with " + socket.id);
	socket.broadcast.emit('new_connection', {id: socket.id});
	
	socket.on('disconnect', () => {
		console.log(socket.id + " disconnected");
		users.splice(users.indexOf(socket.id), 1);
		io.sockets.emit('lost_connection', {id: socket.id});
	});
});