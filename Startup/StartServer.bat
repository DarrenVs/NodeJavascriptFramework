FOR /F "tokens=2,3" %%A IN ('ping %computername% -n 1 -4') DO IF "from"== "%%A" set "IP=%%~B"

set ip=%IP:~0,-1%
set "port=:1337"

set "url=%ip%%port%"

IF EXIST ../server.js (
	start chrome %url%
	node ../server.js
	
) ELSE IF EXIST server.js (
	start chrome %url%
	node server.js
	
)