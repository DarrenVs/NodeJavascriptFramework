var ChunkProperties = {
    
    Tiles: {
        0:false, //Air
        1:Enum.ClassType.Unknown,
        //1:Enum.ClassType.Platform_40x40,
        //2:Enum.ClassType.Platform_80x80,
        //3:Enum.ClassType.Platform_120x80,
    },
    
    tilesXCount: 15,

    tileSize: 40,
    
    //the height of the level we will spawn new chunks at
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
                    position: new Vector2.new(x * this.tileSize + this.tileSize / 2, y * this.tileSize + this.totalLevelHeight),
                })
                
                newObject.extends["collision"] = Collision(newObject);
                newObject.anchored = true;
                
                newObject.colliderType = Enum.colliderType.box;
                newObject.hitbox = Vector2.new(newObject.size.x, newObject.size.y);
                
                Game[stageID].addChild( newObject );
            }
        }
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
    
    
    chunkLibary: {},
    
    uncompressedChunkLibary: {
        
        startLobbyChunk:        "100000000000001100000000000001100000000000001110000000000011101111111111101100100000001001100010000010001110001000100011111000101000111111100010001111111110000011111111111111111111",

        intermediateChunk : "100000000000001100000000000001100000000000001100000000000001100000000000001100000000000001100000000000001100000000000001",

        easyChunks : [
        "100110000000001100000010000011100000011100001111000001110001100000000000001100000000000001",
        "100000000000001100001100100001100000000100011100000000100011100110000000011100110000000001100100010010001100000000000001100000000000001",
        "100000000000001111111000000001100000001110011100000001000011100010000000001110011100000001100010000011001100010000000001100000000000001",
                "100000000000001100000000000001100000011000001101100011000001101100000000111100000000000111100000000000001100011000000001100011001100001100000001100001100000000000001",
                "100000000000001100000100010001100000100010001111000100010001111000100010001100000000000001100000000000001100011100010001100011100011001100111000001001100000000000001",
                "100000000000001111000011000111100000000000001100000000000001100011100110001100000000000001100000000000001100100011000101100100011000101100100011000101100000000000001",
                "110000010000011110000010000011100000010000001100000010000001100100000001001100000000000001100000000000001111000111000111111000111000111100000000000001100000000000001",
        "100000000000001111111000111111100000000000001100000000000001100111111111001100000000000001100000000000001111111000111111100000000000001",
        ],

        testEnemyChunks : [
        "100000000000001100000000000001100000000000001100000000000001100000000000001100000000000001100000000000001100000000000001",
        ]
        
    },
    
}

ChunkProperties.startLoadingChunks();