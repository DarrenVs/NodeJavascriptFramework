Enum.ClassName[Enum.ClassType.Platform_120x120] = Platform_120x120;

// BaseClass
function Platform_120x120(properties) {
    var self = this;
    GameObject(this, properties);
    
    this.extends = {
        collision:Collision(this),
    };
    
    self.ClassType = Enum.ClassType.Platform_120x120;
    
    self.size = Vector2.new(120, 120);
    
    self.colliderType = Enum.colliderType.box;
    
    self.hitbox = Vector2.new(self.size.x, self.size.y);
    
    self.anchored = true;
    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.Platforms_120x120[Math.floor(Math.random() * Enum.Images.Sprites.Platforms_120x120.length)],   //Image
        {   //Sprites
            platform_120x120: {
                position: Vector2.new(0, 0),
                size: Vector2.new(333, 333),
                columns: 1,
                rows: 1,
            },
        },
        {   //Animations
            platform_120x120: {
                sprite: "platform_120x120",
                speed: 0, //Per frame
                keyFrames: [0], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );
}