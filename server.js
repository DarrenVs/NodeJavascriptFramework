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



io.sockets.on('connection', function(socket) {
	
	//Set the client's ID
	var socketID = connectionCounter++;
	socket.emit("IDrequest_to_client", socketID);
	
	
	//Give the socket a broadcaster
	socket.on('object_to_broadcaster', function(data) {
		
		objectPackages += (objectPackages ? ',' : '{' ) + '"' + objectCounter++ + '":' + data["stringifyedObject"];
	});
});



setInterval(function(){
	
	if (objectPackages) {
		io.sockets.emit("object_from_broadcaster", objectPackages + "}");
		objectPackages = "";
	}
	//objectPackages = '{"a":{}'
}, 0)

