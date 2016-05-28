Enum.Worlds.BattleArena = Worlds.length;

Worlds[Enum.Worlds.BattleArena] = function( stage ) {
    GameObject( this );
    
    //Level Boundary
    var boundary = new Enum.ClassName[Enum.ClassType.Boundary]({
        size: new Vector2.new(canvas.width, 10),
        position: new Vector2.new(canvas.width / 2, canvas.height + 20)
    })

    boundary.extends["collision"] = Collision(boundary);
    boundary.anchored = true;
                
    stage.addChild( boundary );
    
    
    
    //Level Generating
    var Tiles = {
        0:false, //Air
        1:Enum.ClassType.Boundary, //Wall
    }
    
    //the x length of all chunks
    var xLength = 15;
    
    //store all uncompressed chunk here:
    var allUncompressedChunks = [
        "100110000000001100000010000011100000011100001111000001110001100000000000001100000000000001",
        "100000000000001100000000000001110001010100011111001010100111100000000000001100000000000001",
        "100000000000001111111000000001100000001110011100000001000011100010000000001110011100000001100010000011001100010000000001100000000000001",
    
    ];
    
    //the chunk we will spawn between regular chunks, to ensure we always have a smooth transition to the next chunk
    var intermediateChunk = UncompressChunk("100000000000001100000000000001100000000000001");
    
    //all chunks will be stored here after uncompressing
    var allChunks = [];
    
    var tileSize = canvas.width / xLength;
    
    var totalLevelHeight = canvas.height;
    
    //uncompress allUncompressedChunks, and store them in the allChunks
    for(i = 0; i < allUncompressedChunks.length; i++) {
        allChunks.push(UncompressChunk(allUncompressedChunks[i]));
    }
    
    while(stage.position.y <= totalLevelHeight) {
        spawnIntermediateChunk();
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
                    position:new Vector2.new(x * tileSize, ((-y * tileSize) + totalLevelHeight)),
                    colour: "red",
                })
                
                newObject.extends["collision"] = Collision(newObject);
                newObject.anchored = true;
                
                newObject.colliderType = Enum.colliderType.box;
                newObject.hitbox = Vector2.new(newObject.size.x, newObject.size.y);
                
                stage.addChild( newObject );
            }
        }
    }
    
    function spawnIntermediateChunk() {
        
        var intermediatePlatform = new Enum.ClassName[Enum.ClassType.IntermediatePlatform]({
            size: new Vector2.new(canvas.width, 10),
            position: new Vector2.new(canvas.width / 2, totalLevelHeight)
        })

        intermediatePlatform.extends["collision"] = Collision(intermediatePlatform);
        intermediatePlatform.anchored = true;

        stage.addChild( intermediatePlatform );
        
        spawnChunk(intermediateChunk);
        
        intermediatePlatform = new Enum.ClassName[Enum.ClassType.IntermediatePlatform]({
            size: new Vector2.new(canvas.width, 10),
            position: new Vector2.new(canvas.width / 2, totalLevelHeight)
        })

        intermediatePlatform.extends["collision"] = Collision(intermediatePlatform);
        intermediatePlatform.anchored = true;

        stage.addChild( intermediatePlatform );
    }
    
    
    
    var player;
    
    this.update["BattleArenaUpdate"] = function() {
        
        if (player == undefined || player.health <= 0) {
            
            player = new Player({
                position: new Vector2.new(canvas.width / 2, canvas.height / 2),
                size: new Vector2.new(15, 30),
                colour: "red",
            });
            
            stage.addChild( player );
        }
        
        
        //when we spawn a new chunk
        if(stage.position.y <= totalLevelHeight) {
            spawnIntermediateChunk();
            spawnChunk(allChunks[Math.floor(Math.random()*allChunks.length)]);
        }
        //Game[0].childs
    }
}