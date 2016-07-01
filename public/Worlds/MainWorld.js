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
    
    //Level Boundary
    var boundary = new Enum.ClassName[Enum.ClassType.Boundary]({
        size: new Vector2.new(canvas.width, 10),
        position: new Vector2.new(canvas.width / 2, canvas.height + 20)
    })
                
    stage.addChild( boundary );
}