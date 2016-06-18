Enum.Worlds.MainWorld = Worlds.length;

Worlds[Enum.Worlds.MainWorld] = function( stage ) {
    GameObject( this );
    
    stage.gravity = Vector2.new(0, 22);
    stage.airDenicty = 0;
    
    PlayerProperties.manualStarted = false;
    
    this.update["MainWorldUpdate"] = function() {
        
        stage.position.y = cameraController.cameraPosition();
        
        //////////////////////////
        //---LEVEL GENERATING---///
        //////////////////////////
        
        if(-stage.position.y <= ChunkProperties.totalLevelHeight) {
            sendEvent("sendChunk", {
                chunkID: Math.floor(Math.random()*Enum.SpawnAbleChunks.length),
                stageID: stage.stageID,
            });
        }
    }
    
    /////////////////////////////////
    //---ADD CHUNKS TO SPAWNABLE---///
    /////////////////////////////////
    
    //reset the spawnable chunks
    Enum.SpawnAbleChunks = [];
    
    ChunkProperties.pushToSpawnAble(ChunkProperties.chunkLibary["standardChunks"]);
    
    //ChunkProperties.pushToSpawnAble(ChunkProperties.chunkLibary["chunkToBeTested"]);
    
    //ChunkProperties.pushToSpawnAble(ChunkProperties.chunkLibary["pickupChunks"]);
    
    //ChunkProperties.pushToSpawnAble(ChunkProperties.chunkLibary["enemyChunks"]);
    
    //Level Boundary
    var boundary = new Enum.ClassName[Enum.ClassType.Boundary]({
        size: new Vector2.new(canvas.width, 10),
        position: new Vector2.new(canvas.width / 2, canvas.height + 20)
    })
                
    stage.addChild( boundary );
    
    /////////////////////////
    //---TESTING PICKUPS---///
    /////////////////////////
    
    /*
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
    invulnerability.playerToFollow = PlayerProperties.playerList[]
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
    */
}