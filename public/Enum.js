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
        Platform_120x120: 9,
        Platform_120x200: 10,

        EnemyWalk: 11,
        EnemyShoot: 12,
        
        ParallaxObject: 13,
        
        Wall: 14,
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
                newImage("Images/Platforms/Platforms_40x40/platform_1_40x40.png"),
                newImage("Images/Platforms/Platforms_40x40/platform_2_40x40.png"),
                newImage("Images/Platforms/Platforms_40x40/platform_3_40x40.png"),
                newImage("Images/Platforms/Platforms_40x40/platform_4_40x40.png"),
            ],
            
            Platforms_120x120: [
                //newImage("Images/Platforms/Platforms_120x120/platform_1_120x120.png"),
                //newImage("Images/Platforms/Platforms_120x120/platform_2_120x120.png"),
                newImage("Images/Platforms/Platforms_120x120/platform_3_120x120.png"),
                newImage("Images/Platforms/Platforms_120x120/platform_4_120x120.png"),
            ],
            
            Platforms_120x200: [
                newImage("Images/Platforms/Platforms_120x200/platform_1_120x200.png"),
            ],
            
            //background
            Background: newImage("Images/Backgrounds/background.png"),
            
            //parallax
            ParallaxObjects: {
                //layer 1
                2: [
                    newImage("Images/Backgrounds/Parallax/parallax_1.png"),
                    newImage("Images/Backgrounds/Parallax/parallax_2.png"),
                ],
                //layer 2
                3: [
                    newImage("Images/Backgrounds/Parallax/parallax_3.png"),
                    newImage("Images/Backgrounds/Parallax/parallax_4.png"),
                ],
                //layer 3
                4: [
                    newImage("Images/Backgrounds/Parallax/parallax_5.png"),
                    newImage("Images/Backgrounds/Parallax/parallax_6.png"),
                ]
            
            },
        }
    },
    
    SpawnAbleChunks: [],
}