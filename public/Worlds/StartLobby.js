Enum.Worlds.StartLobby = Worlds.length;

Worlds[Enum.Worlds.StartLobby] = function( stage ) {
    GameObject( this );
    
    var self = this;
    
    var player;
    
    var startInstructions = new StartInstructions();
    
    stage.addChild(startInstructions);
    
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
    
    //reset the spawnable chunks
    Enum.SpawnAbleChunks = [];
    
    //ChunkProperties.pushToSpawnAble(ChunkProperties.chunkLibary["standardChunks"]);
    
    ChunkProperties.pushToSpawnAble(ChunkProperties.chunkLibary["pickupChunks"]);
    
    //ChunkProperties.pushToSpawnAble(ChunkProperties.chunkLibary["enemyChunks"]);
    
    //ChunkProperties.pushToSpawnAble(ChunkProperties.chunkLibary["chunkToBeTested"]);
    
    var playerHolder = new EmptyObject({});
    stage.addChild(playerHolder);
    
    stage.addChild( playerHolder );
    
    sendEvent("playerJoined", {});
    
    this.update["StartLobbyUpdate"] = function() {
        
        if (player == undefined || player.health <= 0) {
            
            player = new Player({
                position: new Vector2.new(canvas.width / 2, canvas.height / 1.3),
                size: new Vector2.new(15, 30),
            });
            
            playerHolder.addChild( player );
        }
                
        stage.position.y = cameraController.cameraPosition();
        
        if(!PlayerProperties.ready && INPUT_CLICK["82"]) {
            PlayerProperties.ready = true;
            sendEvent("playerReady", {
                playerID: player.creatorID,
            });
        }
        
        //if all players are ready, start the game:
        if(PlayerProperties.readyPlayersAmount >= Object.keys(PlayerProperties.existingPlayers).length) {
            
            for(i = 0; i < barrier.length; i++) {
                barrier[i].destroy();
            }
            
            //add all existing players to the active player list, so we know which players started this match
            for(playerID in PlayerProperties.existingPlayers) {
                PlayerProperties.activePlayers[playerID] = PlayerProperties.existingPlayers[playerID];
            }
            
            PlayerProperties.readyPlayersAmount = 0;
            
            startInstructions.deactivate();
            startInstructions.destroy();
            
            LoadWorld(stage, Enum.Worlds.MainWorld);
            
            LoadWorld( Game.addChild( "UIStage", new Stage() ), Enum.Worlds.GameUIWorld );
            delete self.update["StartLobbyUpdate"];
        }
                
        sendObject( playerHolder );
    }
}