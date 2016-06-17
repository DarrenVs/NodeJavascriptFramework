Enum.Worlds.StartLobby = Worlds.length;

Worlds[Enum.Worlds.StartLobby] = function( stage ) {
    GameObject( this );
    
    var self = this;
    
    stage.addChild(new Enum.ClassName[Enum.ClassType.Background]);
    
    stage.gravity = Vector2.new(0, 20);
    
    //spawn parallax
    stage.addChild(new Parallax());
    
    ChunkProperties.totalLevelHeight = canvas.height;
    
    ChunkProperties.spawnChunk(ChunkProperties.chunkLibary.startLobbyChunk, stage.stageID);
    
    //spawn barrier
    var barrier = [];
    
    for(x = 0; x < ChunkProperties.tilesXCount; x++) {
        var newObject = new Enum.ClassName[Enum.ClassType.Wall]({
            size: new Vector2.new(ChunkProperties.tileSize, ChunkProperties.tileSize),
            position: new Vector2.new(x * ChunkProperties.tileSize + ChunkProperties.tileSize * 1.5, ChunkProperties.totalLevelHeight),
        })

        barrier.push( newObject );
        
        stage.addChild( newObject );
    }
    
    var player;
    
    this.update["StartLobbyUpdate"] = function() {
        
        if (player == undefined || player.health <= 0) {
            
            player = new Player({
                position: new Vector2.new(canvas.width / 2, canvas.height / 1.3),
                size: new Vector2.new(15, 30),
                colour: "red",
            });
            
            stage.addChild( player );
        }
                
        stage.position.y = cameraController.cameraPosition();
        
        if(Object.keys(PlayerProperties.playerList).length > 1 || INPUT_CLICK["82"]) {
            for(i = 0; i < barrier.length; i++) {
                barrier[i].destroy();
            }

            LoadWorld(stage, Enum.Worlds.MainWorld);
            delete self.update["StartLobbyUpdate"];
        }
    }
    
    stage.addChild(new StartInstructions());
}