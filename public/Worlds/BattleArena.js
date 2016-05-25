Enum.Worlds.BattleArena = Worlds.length;

Worlds[Enum.Worlds.BattleArena] = function( stage ) {
    GameObject( this );
    
    
    var Tiles = {
        0:false, //Air
        1:Enum.ClassType.Unknown, //Wall
    }
    
    mapSize = new Vector2.new(1250, 1250);
    
    var player;
        
    var xLength = 10;

    spawnChunk(UncompressChunk("01010101010101010101"));
    
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
        
        tileSize = new Vector2.new(
            mapSize.x / yLength,
            mapSize.y / xLength
        )
        
        for (y = 0; y < yLength; y++)
        {
            for (x = 0; x < xLength; x++)
            {
                if (!Enum.ClassName[Tiles[chunkToSpawn[y][x]]]) continue;
            
                var newObject = new Enum.ClassName[Tiles[chunkToSpawn[y][x]]]({
                    size:tileSize,
                    position:Vector2.multiply(
                        tileSize,
                        new Vector2.new(x, y)
                    )
                })

                newObject.extends["collision"] = Collision(newObject);
                newObject.anchored = true;
                
                stage.addChild( newObject );
            }
        }
    }
    
    
    this.update["BattleArenaUpdate"] = function() {
        
        stage.position.y ++;
        
        if (player == undefined || player.health <= 0) {
            
            player = new Player({
                position: new Vector2.new(Math.random()*1000, Math.random()*1000),
                size: new Vector2.new(15, 30),
                colour: "red",
            });
            
            stage.addChild( player );
        }
    }
}