Enum.ClassName[Enum.ClassType.Background] = Background;

// BaseClass
function Background(properties) {
    var self = this;
    GameObject(this, properties);
    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.Background,   //Image
        {   //Sprites
            background: {
                position: Vector2.new(0, 0),
                size: Vector2.new(Enum.Images.Sprites.Background.width, Enum.Images.Sprites.Background.height),
                columns: 1,
                rows: 1,
            },
        },
        {   //Animations
            background: {
                sprite: "background",
                speed: 0, //Per frame
                keyFrames: [0], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );
    
    self.size = new Vector2.new(canvas.width, canvas.height);
    
    self.position = new Vector2.new(canvas.width / 2, canvas.height / 2);
    
}