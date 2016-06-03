Enum.Worlds.BattleArena = Worlds.length;

var ChunkProperties = {
    
    Tiles: {
        0:false, //Air
        1:Enum.ClassType.Unknown, //Wall
    },
    
    tilesXCount: 15,

    tileSize: 40,
    
    //the height of the level we will spawn new chunks at
    totalLevelHeight: 955,
    
    spawnChunk: function(chunkToSpawn, stageID) {
        
        //calculate the y Length of this chunk, take its total length and divide it by its width.
        var yLength = (chunkToSpawn.length * chunkToSpawn[0].length) / this.tilesXCount;
        
        for (y = 0; y < yLength; y++)
        {
            for (x = 0; x < this.tilesXCount; x++)
            {
                if (!Enum.ClassName[this.Tiles[chunkToSpawn[y][x]]]) continue;
                
                var newObject = new Enum.ClassName[this.Tiles[chunkToSpawn[y][x]]]({
                    size: new Vector2.new(this.tileSize, this.tileSize),
                    position: new Vector2.new(x * this.tileSize + this.tileSize / 2, -y * this.tileSize + this.totalLevelHeight),
                })
                
                newObject.extends["collision"] = Collision(newObject);
                newObject.anchored = true;
                
                newObject.colliderType = Enum.colliderType.box;
                newObject.hitbox = Vector2.new(newObject.size.x, newObject.size.y);
                
                Game[stageID].addChild( newObject );
            }
        }
        
        //increase the total level height by the height of this chunk, so we know when to spawn another chunk
        this.totalLevelHeight -= yLength * this.tileSize;
    },
}

Worlds[Enum.Worlds.BattleArena] = function( stage ) {
    GameObject( this );
    
    /////////////////////
    //---LEVEL SETUP---///
    /////////////////////
    
    ChunkProperties.tilesXCount = 15;//canvas.width / ChunkProperties.tilesXCount;
    
    ChunkProperties.totalLevelHeight = canvas.height;
    
    //Player:
    var player;
    
    var highestPlayerPos = canvas.height / 2;
    
    this.update["BattleArenaUpdate"] = function() {
        
        if (player == undefined || player.health <= 0) {
            
            player = new Player({
                position: new Vector2.new(canvas.width / 2, canvas.height / 2),
                size: new Vector2.new(15, 30),
                colour: "red",
            });
            
            stage.addChild( player );
        }
        
        
        //keep the camera at the position of the highest player
        for (var index in playerList) {
            if(playerList[index].position.y < highestPlayerPos) {
               highestPlayerPos =  playerList[index].position.y
            } 
        }
        
        stage.position.y = -highestPlayerPos + canvas.height / 2;
        
        //when we spawn a new chunk
        if(-stage.position.y <= ChunkProperties.totalLevelHeight) {
            spawnIntermediateChunk();
            checkIfRightPlayer();
        }
    }
    
<<<<<<< HEAD
=======
    //Enemy
    var enemy = new Enemy({
        position: Vector2.new(80, 80),
        size: Vector2.new(20, 20),
        ID: 'enemy',
        colour: "blue"
    });
    
    stage.addChild(enemy);
    
    
>>>>>>> origin/Game
    function checkIfRightPlayer() {
        var lowestIndex = player.creatorID;
        
        for (var index in playerList) {
            if(playerList[index].creatorID < lowestIndex)
                lowestIndex = playerList[index].creatorID;
        }
        
        if(lowestIndex == player.creatorID) {
            var parameters = {
                chunkID: Math.floor(Math.random()*Enum.SpawnAbleChunks.length),
                stageID: Game[0].ID.substr(Game[0].ID.indexOf(":")+1),
            };
            
            events.sendChunk(parameters);
        }
    }
    
    
    
    //Level Boundary
    var boundary = new Enum.ClassName[Enum.ClassType.Boundary]({
        size: new Vector2.new(canvas.width, 10),
        position: new Vector2.new(canvas.width / 2, canvas.height + 20)
    })

    boundary.extends["collision"] = Collision(boundary);
    boundary.anchored = true;
                
    stage.addChild( boundary );
    
    //////////////////////////
    //---LEVEL GENERATING---///
    //////////////////////////
    
    var uncompressedChunkLib = new uncompressedChunkLibary();
    
    var chunkLib = new chunkLibary();
    
    //the chunk we will spawn between regular chunks, to ensure we always have a smooth transition to the next chunk
    var intermediateChunk = uncompressChunk(uncompressedChunkLib.intermediateChunk);
    
    //this is where all uncompressed chunks are added the chunk libary (compressed chunks)
    //in the libary they are stored until we add them to spawnable
    
    pushToChunkLibary("easyChunks", uncompressedChunkLib.easyChunks);
    
    pushToSpawnAble(chunkLib["easyChunks"]);
    
    function pushToChunkLibary(key, arrayOfUncompressedChunks) { 
        var arrayOfCompressedChunks = [];
        
        for(i = 0; i < arrayOfUncompressedChunks.length; i++) {
            arrayOfCompressedChunks.push(uncompressChunk(arrayOfUncompressedChunks[i]));
        }
        
        chunkLib[key] = arrayOfCompressedChunks;
    }
     
    function pushToSpawnAble(arrayOfChunks) {
        for(i = 0; i < arrayOfChunks.length; i++) {
            Enum.SpawnAbleChunks.push(arrayOfChunks[i]);
        }
    }
    
    //uncompress the chunk to a 2d array (int[][])
    function uncompressChunk(stringToParse) {
        var yLength = stringToParse.length / ChunkProperties.tilesXCount;
        
        var counter = 0;
        
        var chunk = new Array();
        
        //assign every int in a 2 dimensional array
        for (y = 0; y < yLength; y++) {
            chunk[y] = new Array();
            for (x = 0; x < ChunkProperties.tilesXCount; x++) {
                chunk[y][x] = stringToParse[counter];
                counter++;
            }
        }
        
        return chunk;
    }
    
    var intermediatePlatformHeight = 10;
    
    //the offset of the platforms from mid
    var intermediatePlatformPosition = 2.35;
    
    function spawnIntermediateChunk() {
        
        var intermediatePlatform = new Enum.ClassName[Enum.ClassType.IntermediatePlatform]({
            size: new Vector2.new(canvas.width, intermediatePlatformHeight),
            position: new Vector2.new(canvas.width / 2, ChunkProperties.totalLevelHeight - ChunkProperties.tileSize * intermediatePlatformPosition)
        })

        intermediatePlatform.extends["collision"] = Collision(intermediatePlatform);
        intermediatePlatform.anchored = true;
        
        stage.addChild( intermediatePlatform );
        
        ChunkProperties.spawnChunk(intermediateChunk, Game[0].ID.substr(Game[0].ID.indexOf(":")+1));
        
        intermediatePlatform = new Enum.ClassName[Enum.ClassType.IntermediatePlatform]({
            size: new Vector2.new(canvas.width, intermediatePlatformHeight),
            position: new Vector2.new(canvas.width / 2, ChunkProperties.totalLevelHeight + ChunkProperties.tileSize * intermediatePlatformPosition)
        })
        
        intermediatePlatform.extends["collision"] = Collision(intermediatePlatform);
        intermediatePlatform.anchored = true;


        stage.addChild( intermediatePlatform );
    }
}


this.uncompressedChunkLibary = function () {
    
}

uncompressedChunkLibary.prototype = {
    
    intermediateChunk : "100000000000001100000000000001100000000000001100000000000001100000000000001100000000000001100000000000001100000000000001",

    easyChunks : [
        "100110000000001100000010000011100000011100001111000001110001100000000000001100000000000001",
        "100000000000001100001100100001100000000100011100000000100011100110000000011100110000000001100100010010001100000000000001100000000000001",
        "100000000000001111111000000001100000001110011100000001000011100010000000001110011100000001100010000011001100010000000001100000000000001",
        "100000000000001100000000000001100000011000001101100011000001101100000000111100000000000111100000000000001100011000000001100011001100001100000001100001100000000000001",
        "100000000000001100000100010001100000100010001111000100010001111000100010001100000000000001100000000000001100011100010001100011100011001100111000001001100000000000001",
        "100000000000001111000011000111100000000000001100000000000001100011100110001100000000000001100000000000001100100011000101100100011000101100100011000101100000000000001",
        "110000010000011110000010000011100000010000001100000010000001100100000001001100000000000001100000000000001111000111000111111000111000111100000000000001100000000000001",
        "100000000000001111111000111111100000000000001100000000000001100111111111001100000000000001100000000000001111111000111111100000000000001",
    ],
    
    mediumChunks : [
        "100110000000001100000010000011100000011100001111000001110001100000000000001100000000000001",
        "100000000000001100001100100001100000000100011100000000100011100110000000011100110000000001100100010010001100000000000001100000000000001",
        "100000000000001111111000000001100000001110011100000001000011100010000000001110011100000001100010000011001100010000000001100000000000001",
        "100000000000001100000000000001100000011000001101100011000001101100000000111100000000000111100000000000001100011000000001100011001100001100000001100001100000000000001",
        "100000000000001100000100010001100000100010001111000100010001111000100010001100000000000001100000000000001100011100010001100011100011001100111000001001100000000000001",
        "100000000000001111000011000111100000000000001100000000000001100011100110001100000000000001100000000000001100100011000101100100011000101100100011000101100000000000001",
        "110000010000011110000010000011100000010000001100000010000001100100000001001100000000000001100000000000001111000111000111111000111000111100000000000001100000000000001",
        "100000000000001111111000111111100000000000001100000000000001100111111111001100000000000001100000000000001111111000111111100000000000001",
    ],
    
    hardChunks : [
        "100110000000001100000010000011100000011100001111000001110001100000000000001100000000000001",
        "100000000000001100001100100001100000000100011100000000100011100110000000011100110000000001100100010010001100000000000001100000000000001",
        "100000000000001111111000000001100000001110011100000001000011100010000000001110011100000001100010000011001100010000000001100000000000001",
        "100000000000001100000000000001100000011000001101100011000001101100000000111100000000000111100000000000001100011000000001100011001100001100000001100001100000000000001",
        "100000000000001100000100010001100000100010001111000100010001111000100010001100000000000001100000000000001100011100010001100011100011001100111000001001100000000000001",
        "100000000000001111000011000111100000000000001100000000000001100011100110001100000000000001100000000000001100100011000101100100011000101100100011000101100000000000001",
        "110000010000011110000010000011100000010000001100000010000001100100000001001100000000000001100000000000001111000111000111111000111000111100000000000001100000000000001",
        "100000000000001111111000111111100000000000001100000000000001100111111111001100000000000001100000000000001111111000111111100000000000001",
    ],
    
    testEnemyChunks : [
        "100000000000001100000000000001100000000000001100000000000001100000000000001100000000000001100000000000001100000000000001",
    ]
}

this.chunkLibary = function () {
    
}

chunkLibary.prototype = {};