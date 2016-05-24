Enum.Worlds.BattleArena = Worlds.length;

Worlds[Enum.Worlds.BattleArena] = function( stage ) {
    GameObject( this );
    
    
    var Tiles = {
        0:false, //Air
        1:Enum.ClassType.Unknown, //Wall
    }
    
    var map = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,0,1,1,0,1,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,1,0,0,1],
        [1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
        [1,0,0,1,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
        [1,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1],
        [1,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
        [1,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
        [1,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1],
        [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1],
        [1,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
        [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,1],
        [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ]
    mapSize = new Vector2.new(1250, 1250);
    tileSize = new Vector2.new(
        mapSize.x / map[0].length,
        mapSize.y / map.length
    )
    
    
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
            
            stage.addChild( newObject );
        }
    }
    
    var player;
        
    var xLength = 10;
    
    spawnChunk(UncompressChunk("0101010101"));
    
    //uncompress the chunk to a 2d array
    function UncompressChunk(stringToParse) {
        var yLength = stringToParse.length / xLength;

        var counter = 0;
        
        var chunk = new Array();
        
        //assign every int in a 2 dimensional array
        for (x = 0; x < xLength; x++) {
            chunk[x] = new Array();
            for (y = 0; y < yLength; y++) {
                chunk[x][y] = stringToParse[counter];
                counter++;
            }
        }
        return chunk;
    }
    
    var objectToSpawnNames = [new Bullet, new Player, new EmptyObject];
    
    //excpects an int[,]
    function spawnChunk( chunkToSpawn ) {

        //calculate the y Length of this chunk, take its total length and divide it by its width.
        var yLength = chunkToSpawn.length / xLength;

        for (y = 0; y < yLength; y++)
        {
            for (x = 0; x < xLength; x++)
            {
                console.log(chunkToSpawn[x][y]);
                
                /*
                if (objectToSpawnNames[chunkToSpawn[x][y]] != null)
                {                
                    var spawnedObject = new objectToSpawnNames[chunkToSpawn[x, y]];
                    spawnedObject.position.x;
                    spawnedObject.position.y;
                }*/
            }
        }
    }
    
    
    this.update["BattleArenaUpdate"] = function() {
        
        if (player == undefined || player.health <= 0) {
            
            player = new Player({
                position: new Vector2.new(Math.random()*1000, Math.random()*1000),
                size: new Vector2.new(15, 30),
                colour: "red",
            });
            
            stage.addChild( player );
        }
    }
    
    this.update["Scroller"] = function(Obj, deltaTime) {
        //Obj.stage.position.y += 10000 * deltaTime;
    }
}