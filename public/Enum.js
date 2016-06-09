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

        EnemyWalk: 11,
        EnemyShoot: 12,
        
        ParallaxObject: 13,
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
                newImage("Images/Platforms/Platforms_40x40/platform_5_40x40.png"),
                newImage("Images/Platforms/Platforms_40x40/platform_6_40x40.png"),
                newImage("Images/Platforms/Platforms_40x40/platform_7_40x40.png"),
                newImage("Images/Platforms/Platforms_40x40/platform_7_40x40.png")
            ],
            
            Platforms_80x80: [
                newImage("Images/Platforms/Platforms_80x80/platform_1_80x80.png"),
                newImage("Images/Platforms/Platforms_80x80/platform_2_80x80.png"),
                newImage("Images/Platforms/Platforms_80x80/platform_3_80x80.png"),
                newImage("Images/Platforms/Platforms_80x80/platform_4_80x80.png"),
                newImage("Images/Platforms/Platforms_80x80/platform_5_80x80.png"),
                newImage("Images/Platforms/Platforms_80x80/platform_6_80x80.png"),
                newImage("Images/Platforms/Platforms_80x80/platform_7_80x80.png"),
                newImage("Images/Platforms/Platforms_80x80/platform_8_80x80.png"),
            ],
            
            Platforms_80x120: [
                newImage("Images/Platforms/Platforms_80x120/platform_1_80x120.png"),
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