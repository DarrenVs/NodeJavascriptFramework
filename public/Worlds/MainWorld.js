Enum.Worlds.MainWorld = Worlds.length;

Worlds[Enum.Worlds.MainWorld] = function( stage ) {
    GameObject( this );
    
    /////////////////////
    //---LEVEL SETUP---///
    /////////////////////

    stage.addChild(new Parallax());
    
    var highestPlayerPos = canvas.height / 2;
    stage.gravity = Vector2.new(0, 22);
    stage.airDenicty = 0;
    
    this.update["MainWorldUpdate"] = function() {
        
        if (player == undefined || player.health <= 0) {
            
            player = new Player({
                position: new Vector2.new(canvas.width / 2, canvas.height / 2),
                size: new Vector2.new(15, 30),
                colour: "red",
            });
            
            stage.addChild( player );
        }
        
        
        stage.position.y = cameraController.cameraPosition();
        
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
    
    function checkIfRightPlayer() {
        var lowestIndex = player.creatorID;
        
        for (var index in playerList) {
            if(playerList[index].creatorID < lowestIndex)
                lowestIndex = playerList[index].creatorID;
        }
        
        if(lowestIndex == player.creatorID) {
            
            EventQue["sendChunk"] = {
                chunkID: Math.floor(Math.random()*Enum.SpawnAbleChunks.length),
                stageID: Game[0].ID.substr(Game[0].ID.indexOf(":")+1),
            }
        }
    }
    
    //Level Boundary
    var boundary = new Enum.ClassName[Enum.ClassType.Boundary]({
        size: new Vector2.new(canvas.width, 10),
        position: new Vector2.new(canvas.width / 2, canvas.height + 20)
    })

    boundary.extends["collision"] = Collision(boundary);
    boundary.collisionActive = false;
                
    stage.addChild( boundary );
    

    
    //the chunk we will spawn between regular chunks, to ensure we always have a smooth transition to the next chunk
    var intermediateChunk = ChunkProperties.chunkLibary.intermediateChunk;//uncompressChunk(uncompressedChunkLib.intermediateChunk);
    
    var intermediatePlatformHeight = 10;
    
    //the offset of the platforms from mid
    var intermediatePlatformPosition = 2;
    
    function spawnIntermediateChunk() {
        
        var intermediatePlatform = new Enum.ClassName[Enum.ClassType.IntermediatePlatform]({
            size: new Vector2.new(canvas.width, intermediatePlatformHeight),
            position: new Vector2.new(canvas.width / 2, ChunkProperties.totalLevelHeight - ChunkProperties.tileSize * intermediatePlatformPosition)
        })

        stage.addChild( intermediatePlatform );
        
        ChunkProperties.spawnChunk(intermediateChunk, Game[0].ID.substr(Game[0].ID.indexOf(":")+1));
        
        intermediatePlatform = new Enum.ClassName[Enum.ClassType.IntermediatePlatform]({
            size: new Vector2.new(canvas.width, intermediatePlatformHeight),
            position: new Vector2.new(canvas.width / 2, ChunkProperties.totalLevelHeight + ChunkProperties.tileSize * intermediatePlatformPosition)
        })

        stage.addChild( intermediatePlatform );
    }
}