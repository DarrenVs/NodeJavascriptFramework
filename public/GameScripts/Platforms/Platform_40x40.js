Enum.ClassName[Enum.ClassType.Platform_40x40] = Platform_40x40;

// BaseClass
function Platform_40x40(properties) {
    var self = this;
    GameObject(this, properties);
    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.Platforms_40x40[Math.floor(Math.random() * Enum.Images.Sprites.Platforms_40x40.length)],   //Image
        {   //Sprites
            platform_40x40: {
                position: Vector2.new(0, 0),
                size: Vector2.new(40, 40),
                columns: 1,
                rows: 1,
            },
        },
        {   //Animations
            platform_40x40: {
                sprite: "platform_40x40",
                speed: 0, //Per frame
                keyFrames: [0], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );
    
    self.size = Vector2.new(40, 40);
    
    self.colliderType = Enum.colliderType.box;
    
    self.hitbox = Vector2.new(self.size.x, self.size.y);
    
    
}