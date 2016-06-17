Enum.ClassName[Enum.ClassType.ThrowAbleObject] = ThrowAbleObject;

// BaseClass
function ThrowAbleObject(properties) {
    var self = this;
    GameObject(this, properties);
    
    self.size = new Vector2.new(20,9);
    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.ThrowAbleObjectImage,   //Image
        {   //Sprites
            ThrowAble: {
                position: Vector2.new(0, 0),
                size: Vector2.new(20, 9),
                columns: 1,
                rows: 1,
            },
        },
        {   //Animations
            ThrowAble: {
                sprite: "ThrowAble",
                speed: 0, //Per frame
                keyFrames: [0], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );
}