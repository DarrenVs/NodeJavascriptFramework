var Enum = {

    gravity: {

        worldPoint: 0,
        global: 1
    },
    
    colliderType: {
        
        box: 0,
        circle: 1,
    },
    
    ClassType: {
        
        Unknown: 0,
        Player: 1,
        Enemy: 2,
        Terrain: 3,
        DamagingObject: 4,
        Boundary: 5,
        IntermediatePlatform: 6,
        MousePointer: 7
        
    },
    
    ClassName: {
        
    },
    
    Worlds: {
    
    },
    
    Images: {
        
        Sprites: {
            
            PlayerRunSpriteSheet: newImage("Images/PlayerRun-SpriteSheet.png"),
            PlayerJumpSpriteSheet: newImage("Images/PlayerJump-SpriteSheet.png"),
        }
    },
    
    SpawnAbleChunks: [],
}