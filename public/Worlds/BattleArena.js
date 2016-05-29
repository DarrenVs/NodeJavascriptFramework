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
        1:Enum.ClassType.Unknown, //Wall
    }
    
    //the x length of all chunks
    var xLength = 15;
    
    //store all uncompressed chunk here:
    var allUncompressedChunks = [
        "100110000000001100000010000011100000011100001111000001110001100000000000001100000000000001",
        "100000000000001100001100100001100000000100011100000000100011100110000000011100110000000001100100010010001100000000000001100000000000001",
        "100000000000001111111000000001100000001110011100000001000011100010000000001110011100000001100010000011001100010000000001100000000000001",
        "100000000000001100000000000001100000011000001101100011000001101100000000111100000000000111100000000000001100011000000001100011001100001100000001100001100000000000001",
        "100000000000001100000100010001100000100010001111000100010001111000100010001100000000000001100000000000001100011100010001100011100011001100111000001001100000000000001",
        "100000000000001111000011000111100000000000001100000000000001100011100110001100000000000001100000000000001100100011000101100100011000101100100011000101100000000000001",
        "110000010000011110000010000011100000010000001100000010000001100100000001001100000000000001100000000000001111000111000111111000111000111100000000000001100000000000001",
    ];
    
    //the chunk we will spawn between regular chunks, to ensure we always have a smooth transition to the next chunk
    var intermediateChunk = uncompressChunk("100000000000001100000000000001100000000000001100000000000001100000000000001");
    
    //all chunks will be stored here after uncompressing on start
    var allChunks = [];
    
    var tileSize = canvas.width / xLength;
    
    var totalLevelHeight = canvas.height;
    
    //uncompress allUncompressedChunks, and store them in the allChunks
    for(i = 0; i < allUncompressedChunks.length; i++) {
        allChunks.push(uncompressChunk(allUncompressedChunks[i]));
    }
    
    while(-stage.position.y <= totalLevelHeight) {
        //spawnIntermediateChunk();
        spawnChunk(allChunks[Math.floor(Math.random()*allChunks.length)]);
    }
     
    //uncompress the chunk to a 2d array (int[][])
    function uncompressChunk(stringToParse) {
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
    
    //excpects a 2d array (int[][])
    function spawnChunk( chunkToSpawn ) {
        //calculate the y Length of this chunk, take its total length and divide it by its width.
        var yLength = (chunkToSpawn.length * chunkToSpawn[0].length) / xLength;
        
        for (y = 0; y < yLength; y++)
        {
            for (x = 0; x < xLength; x++)
            {
                if (!Enum.ClassName[Tiles[chunkToSpawn[y][x]]]) continue;
                
                var newObject = new Enum.ClassName[Tiles[chunkToSpawn[y][x]]]({
                    size: new Vector2.new(tileSize, tileSize),
                    position: new Vector2.new(x * tileSize + tileSize / 2, -y * tileSize + totalLevelHeight),
                })
                
                newObject.extends["collision"] = Collision(newObject);
                newObject.anchored = true;
                
                newObject.colliderType = Enum.colliderType.box;
                newObject.hitbox = Vector2.new(newObject.size.x, newObject.size.y);
                
                stage.addChild( newObject );
            }
        }
        
        //increase the total level height by the height of this chunk, so we know when to spawn another chunk
        totalLevelHeight -= yLength * tileSize;
    }
    
    function spawnIntermediateChunk() {
        
        var intermediatePlatform = new Enum.ClassName[Enum.ClassType.IntermediatePlatform]({
            size: new Vector2.new(canvas.width, 10),
            position: new Vector2.new(canvas.width / 2, totalLevelHeight - tileSize * 1.5)
        })

        intermediatePlatform.extends["collision"] = Collision(intermediatePlatform);
        intermediatePlatform.anchored = true;

        stage.addChild( intermediatePlatform );
        
        spawnChunk(intermediateChunk);
        
        intermediatePlatform = new Enum.ClassName[Enum.ClassType.IntermediatePlatform]({
            size: new Vector2.new(canvas.width, 10),
            position: new Vector2.new(canvas.width / 2, totalLevelHeight + tileSize * 1.5)
        })
        
        intermediatePlatform.extends["collision"] = Collision(intermediatePlatform);
        intermediatePlatform.anchored = true;


        stage.addChild( intermediatePlatform );
    }
    
    var player;
    
    var players = [];
    
    var highestPlayerPos = canvas.height / 2;
    
    this.update["BattleArenaUpdate"] = function() {
        
        if (player == undefined || player.health <= 0) {
            
            player = new Player({
                position: new Vector2.new(canvas.width / 2, canvas.height / 2),
                size: new Vector2.new(15, 30),
                colour: "red",
            });
            
            stage.addChild( player );
            players.push( player );
        }
        
        for(i = 0; i < players.length; i++) {
            if(players[i].position.y < highestPlayerPos) {
               highestPlayerPos =  players[i].position.y
            } 
        }
        
        stage.position.y = -highestPlayerPos + canvas.height / 2;
        
        //when we spawn a new chunk
        if(-stage.position.y <= totalLevelHeight) {
            //spawnIntermediateChunk();
            spawnChunk(allChunks[Math.floor(Math.random()*allChunks.length)]);
        }
        //Game[0].childs
    }
}
