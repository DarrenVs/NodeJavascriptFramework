var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


// Send index.html
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
	
	res.sendFile('index.html');
})


//Turn on the server
server.listen(1337);

var connectionCounter = 0; //Used to define the socket's ID
var objectCounter = 0; //Used for a unique ID for the send objects
var connectedSockets = {}; //Connected sockets (for access to the socket's methods for example: disconnecting the socket or for a private emit)
var timeoutTime = 60000; //Ms seconds
var serverRepsonseTime = 10; //Ms seconds
var maxRoomConnectionCount = 4;


var objectPackages = "";


var rooms = {}



function CreateRoom( roomName ) {
	
	currentRoom = Object.keys(rooms).length;
	rooms[Object.keys(rooms).length] = {
		objectPackages: "",
		Players: {
			socketID: true,
		},
	}
}
function JoinRoom( roomName ) {
	
	
	
}

io.sockets.on('connection', function(socket) {
	
	//Set the client's ID
	var socketID = connectionCounter++;
	connectedSockets[socketID] = socket;
	console.log(socketID + " connected");
	
	//Set the client's room
	var currentRoom = undefined;
	for (var i in rooms) {
		if (Object.keys(rooms[i].Players).length < maxRoomConnectionCount) {
			
			rooms[i].Players[socketID] = timeoutTime;
			currentRoom = i;
		}
	}
	
	if (currentRoom == undefined) {
		
		currentRoom = Object.keys(rooms).length;
		rooms[Object.keys(rooms).length] = {
			objectPackages: "",
			Players: {
				[socketID]: timeoutTime,
			},
		}
	}
	
	//Join the current room
	socket.join(currentRoom);
	
	console.log("Room: " + currentRoom + " has a playercount of: " + Object.keys(rooms[currentRoom].Players).length);
	
	
	//Give the client's information
	socket.on('IDrequest_from_client', function() {
		
		socket.emit("IDrequest_to_client", {socketID:socketID, socketRoom:currentRoom});
	});
	
	
	socket.on('disconnect', function() {
		delete connectedSockets[socketID];
		delete rooms[currentRoom].Players[socketID];
		io.sockets.in(currentRoom).emit("UpdatePlayerlist", rooms[currentRoom].Players);
		
		console.log(socketID + " disconnected");
		console.log("Room: " + currentRoom + " has a playercount of: " + Object.keys(rooms[currentRoom].Players).length);
	});
	
	//On client request playerlist
	io.sockets.in(currentRoom).emit("UpdatePlayerlist", rooms[currentRoom].Players);
	
	
	//Give the socket a broadcaster
	socket.on('object_to_broadcaster', function(data) {
		
		rooms[currentRoom].objectPackages += (rooms[currentRoom].objectPackages ? ',' : '{' ) + '"' + objectCounter++ + '":' + data["stringifyedObject"];
	});
	
	
	
	//To check if the client is still connected
	socket.on('onHeartbeat', function() {
		
		rooms[currentRoom].Players[socketID] = timeoutTime;
	});
	
	//Broadcast events to other clients
	socket.on('event', function( data ) {
		io.sockets.in(currentRoom).emit("event", data);
	});
});



setInterval(function(){
	
	for (var i in rooms) {
		if (rooms[i].objectPackages) {
			io.sockets.in(i).emit("object_from_broadcaster", rooms[i].objectPackages + "}");
			rooms[i].objectPackages = "";
		}
		for (var socketID in rooms[i].Players) {
			rooms[i].Players[socketID] -= serverRepsonseTime;
			
			if (rooms[i].Players[socketID] <= 0) {
				connectedSockets[socketID].disconnect( true );
			}
		}
	}
}, serverRepsonseTime)

