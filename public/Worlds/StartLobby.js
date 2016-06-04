Enum.Worlds.StartLobby = Worlds.length;

Worlds[Enum.Worlds.StartLobby] = function( stage ) {
    GameObject( this );
    
    ChunkProperties.spawnChunk(ChunkProperties.chunkLibary.startLobbyChunk, Game[0].ID.substr(Game[0].ID.indexOf(":")+1));
    
    var player;
    
    this.update["StartLobbyUpdate"] = function() {
        
        if (player == undefined || player.health <= 0) {
            
            player = new Player({
                position: new Vector2.new(canvas.width / 2, canvas.height / 2),
                size: new Vector2.new(15, 30),
                colour: "red",
            });
            
            stage.addChild( player );
        }
        
        if(Object.keys(playerList).length > 1) {
            LoadWorld(Game[0].ID.substr(Game[0].ID.indexOf(":")+1), Enum.Worlds.MainWorld);
        }
    }
}