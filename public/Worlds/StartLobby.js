Enum.Worlds.StartLobby = Worlds.length;

var player;

Worlds[Enum.Worlds.StartLobby] = function( stage ) {
    GameObject( this );
    
    var self = this;

    stage.gravity = Vector2.new(0, 5);
    
    ChunkProperties.totalLevelHeight = canvas.height;
    
    ChunkProperties.spawnChunk(ChunkProperties.chunkLibary.startLobbyChunk, Game[0].ID.substr(Game[0].ID.indexOf(":")+1));
    
    this.update["StartLobbyUpdate"] = function() {
        
        if (player == undefined || player.health <= 0) {
            
            player = new Player({
                position: new Vector2.new(canvas.width / 2, canvas.height / 2),
                size: new Vector2.new(15, 30),
                colour: "red",
            });
            
            stage.addChild( player );
        }
        
        if(Object.keys(playerList).length > 1 || INPUT_CLICK["82"]) {
            LoadWorld(stage, Enum.Worlds.MainWorld);
            delete self.update["StartLobbyUpdate"];
        }
    }
}