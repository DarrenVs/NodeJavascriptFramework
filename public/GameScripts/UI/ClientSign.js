Enum.ClassName[Enum.ClassType.ClientSign] = ClientSign;

// BaseClass
function ClientSign(properties) {
    var self = this;
    GameObject(this, properties);
    
    self.size = new Vector2.new(20,20);
    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.PlayerClientSprite,   //Image
        {   //Sprites
            PlayerClientImage: {
                position: Vector2.new(0, 0),
                size: Vector2.new(46, 57),
                columns: 1,
                rows: 1,
            },
        },
        {   //Animations
            PlayerClientImage: {
                sprite: "PlayerClientImage",
                speed: 0, //Per frame
                keyFrames: [0], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );
}