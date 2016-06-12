Enum.Worlds.StartLobby = Worlds.length;

Worlds[Enum.Worlds.StartLobby] = function( stage ) {
    GameObject( this );
    
    var self = this;

    stage.gravity = Vector2.new(0, 22);
    
    ChunkProperties.totalLevelHeight = canvas.height;
    
    ChunkProperties.spawnChunk(ChunkProperties.chunkLibary.startLobbyChunk, Game[0].ID.substr(Game[0].ID.indexOf(":")+1));
    
    var barrier = [];
    
    for(x = 0; x < ChunkProperties.tilesXCount; x++) {
        var newObject = new Enum.ClassName[Enum.ClassType.Wall]({
            size: new Vector2.new(ChunkProperties.tileSize, ChunkProperties.tileSize),
            position: new Vector2.new(x * ChunkProperties.tileSize + ChunkProperties.tileSize * 1.5, ChunkProperties.totalLevelHeight),
        })

        barrier.push(newObject);
        
        stage.addChild( newObject );
    }
    
    this.update["StartLobbyUpdate"] = function() {
        
        if (PlayerProperties.player == undefined || PlayerProperties.player.health <= 0) {
            
            PlayerProperties.player = new Player({
                position: new Vector2.new(canvas.width / 2, canvas.height / 1.3),
                size: new Vector2.new(15, 30),
                colour: "red",
            });
            
            stage.addChild( PlayerProperties.player );
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
}