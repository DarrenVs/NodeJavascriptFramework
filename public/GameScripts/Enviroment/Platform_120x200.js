Enum.ClassName[Enum.ClassType.Platform_120x200] = Platform_120x200;

// BaseClass
function Platform_120x200(properties) {
    var self = this;
    GameObject(this, properties);
    
    this.extends = {
        collision:Collision(this),
    };
    
    self.size = Vector2.new(120, 200);
    
    self.colliderType = Enum.colliderType.box;
    
    self.hitbox = Vector2.new(self.size.x, self.size.y);
    
    self.anchored = true;
    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.Platforms_120x200[Math.floor(Math.random() * Enum.Images.Sprites.Platforms_120x200.length)],   //Image
        {   //Sprites
            platform_120x200: {
                position: Vector2.new(0, 0),
                size: Vector2.new(80, 120),
                columns: 1,
                rows: 1,
            },
        },
        {   //Animations
            platform_120x200: {
                sprite: "platform_120x200",
                speed: 0, //Per frame
                keyFrames: [0], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );
    
    this.manualDestroy = function() {
        console.log("im destroyed");
    }
}