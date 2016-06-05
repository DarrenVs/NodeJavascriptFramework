Enum.Worlds.MainWorld = Worlds.length;

Worlds[Enum.Worlds.MainWorld] = function( stage ) {
    GameObject( this );
    
    /////////////////////
    //---LEVEL SETUP---///
    /////////////////////
    
    ChunkProperties.tilesXCount = 15;//canvas.width / ChunkProperties.tilesXCount;
    
    ChunkProperties.totalLevelHeight = canvas.height;
    
    //Player:
    var player;
    
    var highestPlayerPos = canvas.height / 2;
    
    this.update["MainWorldUpdate"] = function() {
        
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
        
        //////////////////////////
        //---LEVEL GENERATING---///
        //////////////////////////
        
        if(-stage.position.y <= ChunkProperties.totalLevelHeight) {
            spawnIntermediateChunk();
            checkIfRightPlayer();
        }
    }
    
    /////////////////////////////////
    //---ADD CHUNKS TO SPAWNABLE---///
    /////////////////////////////////
    
    ChunkProperties.pushToSpawnAble(ChunkProperties.chunkLibary["easyChunks"]);
    
    
    //Enemy
    var enemy = new Enemy({
        position: Vector2.new(80, 80),
        size: Vector2.new(20, 20),
        ID: 'enemy',
        colour: "blue"
    });
    
    stage.addChild(enemy);
    
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
    

    
    //the chunk we will spawn between regular chunks, to ensure we always have a smooth transition to the next chunk
    var intermediateChunk = ChunkProperties.chunkLibary.intermediateChunk;//uncompressChunk(uncompressedChunkLib.intermediateChunk);
    
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