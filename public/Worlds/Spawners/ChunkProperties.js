var ChunkProperties = {
    
    Tiles: {
        0:false, //Air
        
        1: Enum.ClassType.Platform_40x40,
        2: Enum.ClassType.Platform_120x120,
        3: Enum.ClassType.Platform_120x200,

        4: Enum.ClassType.EnemyWalk,
        5: Enum.ClassType.EnemyShoot,
        
        6: Enum.ClassType.Pickup,
    },
    
    tilesXCount: 13,

    tileSize: 40,
    
    //the height of the level we will start spawning new chunks at
    totalLevelHeight: 955,
    
    spawnChunk: function(chunkToSpawn, stageID) {
        
        //calculate the y Length of this chunk, take its total length and divide it by its width.
        var yLength = (chunkToSpawn.length * chunkToSpawn[0].length) / this.tilesXCount;
        
        //increase the total level height by the height of this chunk, so we know when to spawn another chunk
        this.totalLevelHeight -= yLength * this.tileSize;
        
        for (y = 0; y < yLength; y++)
        {
            for (x = 0; x < this.tilesXCount; x++)
            {
                if (!Enum.ClassName[this.Tiles[chunkToSpawn[y][x]]]) continue;
                
                var newObject = new Enum.ClassName[this.Tiles[chunkToSpawn[y][x]]]({
                    size: new Vector2.new(this.tileSize, this.tileSize),
                    position: new Vector2.new(x * this.tileSize + this.tileSize * 1.5, y * this.tileSize + this.totalLevelHeight),
                })
                
                Game[stageID].addChild( newObject );
            }
        }
        
        this.spawnWalls(yLength, stageID);
    },
    
    pushToSpawnAble: function(arrayOfChunks) {
        for(i = 0; i < arrayOfChunks.length; i++) {
            Enum.SpawnAbleChunks.push(arrayOfChunks[i]);
        }
    },
    
    //loads every chunk in the uncompressedChunkLibary
    startLoadingChunks: function() {
        
        for(var i in this.uncompressedChunkLibary) {
            if(typeof this.uncompressedChunkLibary[i] === 'string') {
                this.chunkLibary[i] = this.uncompressChunk(this.uncompressedChunkLibary[i]);
            }
            else { 
                this.chunkLibary[i] = this.uncompressArrayOfChunks(this.uncompressedChunkLibary[i]);
            }
        }
    },
    
    //uncompresses an array of chunks, and saves it with a key
    uncompressArrayOfChunks: function(arrayOfUncompressedChunks) { 
        var arrayOfCompressedChunks = [];
        
        for(i = 0; i < arrayOfUncompressedChunks.length; i++) {
            arrayOfCompressedChunks.push(this.uncompressChunk(arrayOfUncompressedChunks[i]));
        }
        
        
        return arrayOfCompressedChunks;
    },
    
    //uncompress the chunk to a 2d array (int[][])
    uncompressChunk: function(stringToParse) {
        var yLength = stringToParse.length / ChunkProperties.tilesXCount;
        
        var counter = 0;
        
        var chunk = new Array();
        
        //assign every int in a 2 dimensional array
        for (y = 0; y < yLength; y++) {
            chunk[y] = new Array();
            for (x = 0; x < ChunkProperties.tilesXCount; x++) {
                chunk[y][x] = stringToParse[counter];
                counter++;
            }
        }
        
        return chunk;
    },
    
    spawnWalls: function(yLength, stageID) {
        
        for(y = 0; y < yLength; y ++) {
            for(x = 0; x < 2; x++) {
                if(x == 0)
                    var newObject = new Enum.ClassName[Enum.ClassType.Wall]({
                        size: new Vector2.new(this.tileSize, this.tileSize),
                        position: new Vector2.new(this.tileSize / 2, y * this.tileSize + this.totalLevelHeight),
                    })
                else {
                    var newObject = new Enum.ClassName[Enum.ClassType.Wall]({
                        size: new Vector2.new(this.tileSize, this.tileSize),
                        position: new Vector2.new(canvas.width - this.tileSize / 2, y * this.tileSize + this.totalLevelHeight),
                    })
                }

                Game[stageID].addChild( newObject );
            }
        }
    },
    
    chunkLibary: {},
    
    uncompressedChunkLibary: {
        
        startLobbyChunk: /* "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000060060000000006006000000000600600000000060060000000006006000000000600000000000000000000000000000000000000001111111111111",*/
    "111000000011100000000000000000000000000000001110000000000000000001100000000011110000000001111100000001110000001000000000000100000000001111100001100000000011110000000001111000000000110000011100000000000100000000000010000001111111111111",
        
        enemyTestChunk: "000000000000000000000000000004000000000001110000200000000000000000000000000000000000000500000000001111000000000000000000000000000000000000000000005000000500011110001111000000000000001111111111111",

        intermediateChunk : "000000000000000000000000000000000000000",

        easyChunks : [/*
            "00000000000000011000000011001100000001100000011000000000001100000001100000001100110000000110000000000000",
            "0000000000000000000000000000010000010000001111111000000000000000000000000000000000000000000000010001000011111000111110000000000000",
            "0000000000000001000000010000100000001000010000000100001000100010000000010000000000001000000000000100000000100010001000010000000100001000000010000100000001000000000000000",
            "00000000000001111100011111000000000000000000000000000011111111100001111111110000111111111000000000000000000000000000011111000111110000000000000",
            "00000000000000000000000000000000000000000000000300000000000000000020000100000000000000000001000000000000000000000000000000020000000001100000020000110000000000000000000000000000000000",
            "000000000000000000000000000002000002000000000000000000000000000000000000000000000000000000000002002000000000000000000030000000001100000000000110000000000000000000111100000000000010300000000201000111100000100011110000000000000000000000",
            "000000000000000000000000000000110000020000000000000000020020000000000000000000000000000000000000000001000000000000100111000001110000000011110002000000000000000000020000000000000000000200000010001000000200000100000000000000000000000000",
            "0000000000000001100000000000110000001100000000000110000001100000000000110000000000000001100001100000110000110000000000000000000000",
            "00000001110000000000150000000300011100000000001500000000000111000000100000000000010000000000001000000000000000002000000000010000010011000000001001100000000100000010000010000001020000110001100000011000100000000000000000000",
            "000000000000000000000000001100000000011110000300001100000000000000000000000000000000000000002000060000200000000000000100000200000110000000000011000000000001000000000000002000000000200000000000000000000200000000000000000000000000000000",*/
            "000000100000000110010011000011001001100000000000000000000000000000010000000100001000000010000000030000000000000000000060000000006000000000000000200000000020000000000000000000020000000000000000000110011111001111001111100110000000000000",
            "000000000000000000000000000001000001000000100600100000000010000000000201020000000000100000000000000000000000000000000000000000000000000010000000000001000000030000100003000010010010000001001001000111100100111100000000000000000000000000",
            ],
        
        testEnemyChunks : [
        "100000000000001100000000000001100000000000001100000000000001100000000000001100000000000001100000000000001100000000000001",
        ]
        
    },
    
}

ChunkProperties.startLoadingChunks();