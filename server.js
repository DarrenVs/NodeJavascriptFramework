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
var stages = {
	
}
var connectionCounter = 0;
var objectCounter = 0;


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
	
	//Set the client's room
	var currentRoom = undefined;
	for (var i in rooms) {
		if (Object.keys(rooms[i].Players).length < 2) {
			
			rooms[i].Players[socketID] = true;
			currentRoom = i;
		}
	}
	
	if (currentRoom == undefined) {
		
		currentRoom = Object.keys(rooms).length;
		rooms[Object.keys(rooms).length] = {
			objectPackages: "",
			Players: {
				[socketID]: true,
			},
		}
	}
	
	//Join the current room
	socket.join(currentRoom);
	for (var i in rooms) {
		console.log(i + " has a playercount of: " + Object.keys(rooms[i].Players).length);
	}
	
	//Give the client's information
	socket.emit("IDrequest_to_client", {socketID:socketID, socketRoom:currentRoom});
	
	
	socket.on('disconnect', function() {
		delete rooms[currentRoom].Players[socketID];
		io.sockets.in(currentRoom).emit("UpdatePlayerlist", rooms[currentRoom].Players);
	});
	
	//On client request playerlist
	io.sockets.in(currentRoom).emit("UpdatePlayerlist", rooms[currentRoom].Players);
	
	
	//Give the socket a broadcaster
	socket.on('object_to_broadcaster', function(data) {
		
		rooms[currentRoom].objectPackages += (rooms[currentRoom].objectPackages ? ',' : '{' ) + '"' + objectCounter++ + '":' + data["stringifyedObject"];
	});
	
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
	}
}, 10)

