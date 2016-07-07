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
        
        ReadySign: 21,
    },
    
    ClassName: {
        
    },
    
    Worlds: {
    
    },
    
    Images: {
        
        Sprites: {
            
            //player
            PlayerSpriteSheetBlue: newImage("Images/Player/player_blue_spritesheet.png"),
            PlayerSpriteSheetBrown: newImage("Images/Player/BrownspritesheetPlayer.png"),
            PlayerSpriteSheetRed: newImage("Images/Player/player_red_spritesheet.png"),
            PlayerSpriteSheetPurple: newImage("Images/Player/PurpleSpritesheetPlayer.png"),
            
            PlayerClientSprite: newImage("Images/Player/PlayerUI/client_arrow.png"),
            PlayerReadySprite: newImage("Images/Player/PlayerUI/ready_checkmark.png"),

            EnemyAnimationsSheet: newImage("Images/Enemy/enemy_spritesheet.png"),
            
            //effects
            InvulnableEffectSpriteSheet: newImage("Images/Pickups/invulnerable_effect_spritesheet.png"),
            
            MineEffectSpriteSheet: newImage("Images/Pickups/mine_effect_spritesheet.png"),   
            
            BallImage: newImage("Images/Pickups/ball.png"), 
            
            ThrowAbleObjectImage: newImage("Images/Pickups/dart.png"), 
            
            Pickup: newImage("Images/Pickups/pickup_spritesheet.png"),
            
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