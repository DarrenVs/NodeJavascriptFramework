Enum.Worlds.MainWorld = Worlds.length;

Worlds[Enum.Worlds.MainWorld] = function( stage ) {
    GameObject( this );
    
    /////////////////////
    //---LEVEL SETUP---///
    /////////////////////
    
    stage.gravity = Vector2.new(0, 22);
    stage.airDenicty = 0;
    
    this.update["MainWorldUpdate"] = function() {
        
        stage.position.y = cameraController.cameraPosition();
        
        //////////////////////////
        //---LEVEL GENERATING---///
        //////////////////////////
        
        if(-stage.position.y <= ChunkProperties.totalLevelHeight) {
            spawnIntermediateChunk();
            
            if(PlayerProperties.checkHosts()) {
                sendEvent("sendChunk", {
                    chunkID: Math.floor(Math.random()*Enum.SpawnAbleChunks.length),
                    stageID: stage.stageID,
                });
            }
        }
    }
    
    /////////////////////////////////
    //---ADD CHUNKS TO SPAWNABLE---///
    /////////////////////////////////
    
    ChunkProperties.pushToSpawnAble(ChunkProperties.chunkLibary["easyChunks"]);
    
    //Level Boundary
    var boundary = new Enum.ClassName[Enum.ClassType.Boundary]({
        size: new Vector2.new(canvas.width, 10),
        position: new Vector2.new(canvas.width / 2, canvas.height + 20)
    })
                
    stage.addChild( boundary );
    
    ////////////////////////////////////TEST PICKUPS
    var mine = new Enum.ClassName[Enum.ClassType.Mine]({
        size: new Vector2.new(40, 40),
        position: new Vector2.new(100, 350)
    })
                
    stage.addChild( mine );
   
    var invulnerability = new Enum.ClassName[Enum.ClassType.Invulnerability]({
        size: new Vector2.new(40, 40),
        position: new Vector2.new(200, canvas.height /2)
    })
                
    stage.addChild( invulnerability );
    
    
    var bullet = new Enum.ClassName[Enum.ClassType.ThrowAbleObject]({
        size: new Vector2.new(40, 40),
        position: new Vector2.new(300, canvas.height /2)
    })
                
    stage.addChild( bullet );
    
    
    var ball = new Enum.ClassName[Enum.ClassType.Ball]({
        size: new Vector2.new(40, 40),
        position: new Vector2.new(400, canvas.height /2)
    })
                
    stage.addChild( ball );
    ///////////////////////////////////////
    
    //the offset of the platforms from mid
    var intermediatePlatformChunkHeight= (ChunkProperties.chunkLibary.intermediateChunk.length * ChunkProperties.chunkLibary.intermediateChunk[0].length) / ChunkProperties.tilesXCount;
    
    function spawnIntermediateChunk() {
        console.log("spawn intermedita");
        var intermediatePlatform = new Enum.ClassName[Enum.ClassType.IntermediatePlatform]({
            size: new Vector2.new(canvas.width, 10),
            position: new Vector2.new(canvas.width / 2, ChunkProperties.totalLevelHeight - (ChunkProperties.tileSize * intermediatePlatformChunkHeight) / 2 )
        })

        stage.addChild( intermediatePlatform );
        
        ChunkProperties.spawnChunk(ChunkProperties.chunkLibary.intermediateChunk, stage.stageID);
    }
}