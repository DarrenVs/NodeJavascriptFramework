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
        
        Pickup: 15,
        
        Invulnerability: 16,
        Mine: 17,
        Ball: 18,
        ThrowAbleObject: 19,
        
        Background: 20,
    },
    
    ClassName: {
        
    },
    
    Worlds: {
    
    },
    
    Images: {
        
        Sprites: {
            
            //player
            PlayerAnimationSheet: newImage("Images/Player/player_spritesheet.png"),
            
            //effects
            InvulnableEffectSpriteSheet: newImage("Images/Pickups/invulnerable_effect_spritesheet.png"),
            
            MineEffectSpriteSheet: newImage("Images/Pickups/mine_effect_spritesheet.png"),   
            
            BallImage: newImage("Images/Pickups/ball.png"), 
            
            ThrowAbleObjectImage: newImage("Images/Pickups/dart.png"), 
            
            Pickups: [
                {//Invulnable
                    SpriteSheet: newImage("Images/Pickups/invulnerable_pickup_spritesheet.png"),
                    Size: new Vector2.new(1832, 1376),
                    Columns: 10,
                    Rows: 6,
                    Speed: 0.3,
                    Keyframes: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,38,39,40,41,42,44,45,46,47,48,49,50,51,52,53,54,55,56],
                },
                {//mine
                    SpriteSheet: newImage("Images/Pickups/mine_pickup_spritesheet.png"),
                    Size: new Vector2.new(1832, 1375),
                    Columns: 10,
                    Rows: 6,
                    Speed: 0.3,
                    Keyframes: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,38,39,40,41,42,44,45,46,47,48,49,50,51,52,53,54,55,56],
                },
                {//ball
                    SpriteSheet: newImage("Images/Pickups/ball_pickup_spritesheet.png"),
                    Size: new Vector2.new(1465, 1833),
                    Columns: 8,
                    Rows: 8,
                    Speed: 0.3,
                    Keyframes: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,38,39,40,41,42,44,45,46,47,48,49,50,51,52,53,54,55,56,57],
                },
                {//throwAbleObject
                    SpriteSheet: newImage("Images/Pickups/dart_pickup_spritesheet.png"),
                    Size: new Vector2.new(1465, 1833),
                    Columns: 8,
                    Rows: 8,
                    Speed: 0.3,
                    Keyframes: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,38,39,40,41,42,44,45,46,47,48,49,50,51,52,53,54,55,56,57],
                },
            ],
            
            //platforms
            Platforms_40x40: [
                newImage("Images/Platforms/Platforms_40x40/platform_1_40x40.png"),
                newImage("Images/Platforms/Platforms_40x40/platform_2_40x40.png"),
                newImage("Images/Platforms/Platforms_40x40/platform_3_40x40.png"),
            ],
            
            Platforms_120x120: [
                newImage("Images/Platforms/Platforms_120x120/platform_1_120x120.png"),
                newImage("Images/Platforms/Platforms_120x120/platform_2_120x120.png"),
            ],
            
            Platforms_120x200: [
                newImage("Images/Platforms/Platforms_120x200/platform_1_120x200.png"),
            ],
            
            IntermediatePlatform: newImage("Images/Platforms/IntermediatePlatform/intermediatePlatform_1.png"),
            
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