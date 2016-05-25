IF EXIST ../server.js (
	start chrome http://localhost:1337
	node ../server.js
	
) ELSE IF EXIST server.js (
	start chrome http://localhost:1337
	node server.js
	
)