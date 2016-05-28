Enum.Worlds.BattleArena = Worlds.length;

Worlds[Enum.Worlds.BattleArena] = function( stage ) {
    GameObject( this );
    
    
    var Tiles = {
        0:false, //Air
        1:Enum.ClassType.Unknown, //Wall
    }
    
    mapSize = new Vector2.new(canvas.width, canvas.height);
    
    var player;
    
<<<<<<< HEAD
    //spawn level boundary
    var boundary = new Enum.ClassName[Enum.ClassType.Boundary]({
        size: new Vector2.new(canvas.width, 10),
        position: new Vector2.new(canvas.width / 2, canvas.height + 20)
    })

    boundary.extends["collision"] = Collision(boundary);
    boundary.anchored = true;
                
    stage.addChild( boundary );
    
    //store here all chunks
    var allUncompressedChunks = [
        "100110000000001100000010000011100000011100001111000001110001100000000000001100000000000001",
        "100000000000001100000000000001110001010100011111001010100111100000000000001100000000000001",
        "100000000000001111111000000001100000001110011100000001000011100010000000001110011100000001100010000011001100010000000001100000000000001",
    
    ];
    
    //all chunks will be stored here after uncompressing
    var allChunks = [];
    
    //chunk spawning
    var xLength = 15;
    
    var tileSize = mapSize.x / xLength;
    
    var totalLevelHeight = canvas.height;
    
    //uncompress allUncompressedChunks, and store them in the allChunks
    for(i = 0; i < allUncompressedChunks.length; i++) {
        allChunks.push(UncompressChunk(allUncompressedChunks[i]));
=======
    for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {
            
            if (!Enum.ClassName[Tiles[map[y][x]]]) continue;
            
            var newObject = new Enum.ClassName[Tiles[map[y][x]]]({
                size:tileSize,
                position:Vector2.multiply(
                    tileSize,
                    new Vector2.new(x, y)
                ),
            })
            
            newObject.extends["collision"] = Collision(newObject);
            newObject.anchored = true;
            newObject.mass = 1;
            newObject.hitbox = tileSize;
            
            stage.addChild( newObject );
        }
>>>>>>> refs/remotes/origin/master
    }
    
    while(stage.position.y <= totalLevelHeight) {
        spawnChunk(allChunks[Math.floor(Math.random()*allChunks.length)]);
    }
     
    //uncompress the chunk to a 2d array
    function UncompressChunk(stringToParse) {
        var yLength = stringToParse.length / xLength;
        
        var counter = 0;
        
        var chunk = new Array();
        
        //assign every int in a 2 dimensional array
        for (y = 0; y < yLength; y++) {
            chunk[y] = new Array();
            for (x = 0; x < xLength; x++) {
                chunk[y][x] = stringToParse[counter];
                counter++;
            }
        }
        
        return chunk;
    }
    
    //excpects an int[,]
    function spawnChunk( chunkToSpawn ) {
        //calculate the y Length of this chunk, take its total length and divide it by its width.
        var yLength = (chunkToSpawn.length * chunkToSpawn[0].length) / xLength;
        
        //increase the total level height by the height of this chunk, so we know where to spawn this chunk, and when to spawn another chunk
        totalLevelHeight -= yLength * (canvas.width / xLength);
        
        for (y = 0; y < yLength; y++)
        {
            for (x = 0; x < xLength; x++)
            {
                if (!Enum.ClassName[Tiles[chunkToSpawn[y][x]]]) continue;
                
                var newObject = new Enum.ClassName[Tiles[chunkToSpawn[y][x]]]({
                    size:tileSize,
                    position:new Vector2.new(x * tileSize, ((-y * tileSize) + totalLevelHeight))
                })
                
                console.log("Node X = " + newObject.position.x + ", Y = " + newObject.position.y);

                newObject.extends["collision"] = Collision(newObject);
                newObject.anchored = true;
                
                newObject.colliderType = Enum.colliderType.box;
                newObject.hitbox = Vector2.new(newObject.size.x, newObject.size.y);
                
                stage.addChild( newObject );
            }
        }
    }
    
    this.update["BattleArenaUpdate"] = function() {
        
        if (player == undefined || player.health <= 0) {
            
            player = new Player({
                position: new Vector2.new(canvas.width / 2, canvas.height / 2),
                size: new Vector2.new(15, 30),
                colour: "red",
            });
            
            stage.addChild( player );
        }
        
        
        
        if(stage.position.y <= totalLevelHeight) {
            spawnChunk(allChunks[Math.floor(Math.random()*allChunks.length)]);
        }
        //Game[0].childs
    }
}