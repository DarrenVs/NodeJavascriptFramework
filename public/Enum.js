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
        MousePointer: 7,
        
        Platform_40x40: 8,
        Platform_80x80: 9,
        Platform_80x120: 10,
    },
    
    ClassName: {
        
    },
    
    Worlds: {
    
    },
    
    Images: {
        
        Sprites: {
            
            //player
            PlayerRunSpriteSheet: newImage("Images/Player/player_run_spritesheet.png"),
            PlayerJumpSpriteSheet: newImage("Images/Player/player_jump_spritesheet.png"),
            
            //pickups
            InvulnableSpriteSheet: newImage("Images/Pickups/invulnable_spritesheet.png"),
            
            //platforms
            Platforms_40x40: [
                newImage("Images/Platforms/platform_1_40x40.png"),
                newImage("Images/Platforms/platform_2_40x40.png"),
                newImage("Images/Platforms/platform_3_40x40.png")
            ],
            
            Platforms_80x80: [
                newImage("Images/Platforms/platform_1_80x80.png"),
                newImage("Images/Platforms/platform_2_80x80.png"),
                newImage("Images/Platforms/platform_3_80x80.png")
            ],
            
            Platforms_80x120: [
                newImage("Images/Platforms/platform_1_80x120.png"),
            ],
            
            //background
            Background: newImage("Images/Backgrounds/background.png"),
            
            //parallax
            parallax_1: newImage("Images/Backgrounds/Parallax/parallax_1.png"),
            parallax_2: newImage("Images/Backgrounds/Parallax/parallax_2.png"),
            parallax_3: newImage("Images/Backgrounds/Parallax/parallax_3.png"),
            parallax_4: newImage("Images/Backgrounds/Parallax/parallax_4.png"),
            parallax_5: newImage("Images/Backgrounds/Parallax/parallax_5.png"),
            parallax_6: newImage("Images/Backgrounds/Parallax/parallax_6.png"),
        }
    },
    
    SpawnAbleChunks: [],
}