Enum.ClassName[Enum.ClassType.Platform_80x120] = Platform_80x120;

// BaseClass
function Platform_80x120(properties) {
    var self = this;
    GameObject(this, properties);
    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.Platforms_80x120[Math.floor(Math.random() * Enum.Images.Sprites.Platforms_80x120.length)],   //Image
        {   //Sprites
            platform_80x120: {
                position: Vector2.new(0, 0),
                size: Vector2.new(80, 120),
                columns: 1,
                rows: 1,
            },
        },
        {   //Animations
            platform_80x120: {
                sprite: "platform_80x120",
                speed: 0, //Per frame
                keyFrames: [0], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );
    
    self.size = Vector2.new(80, 120);
    
    self.colliderType = Enum.colliderType.box;
    
    self.hitbox = Vector2.new(self.size.x, self.size.y);
}