Enum.ClassName[Enum.ClassType.Ball] = Ball;

// BaseClass
function Ball(properties) {
    var self = this;
    GameObject(this, properties);
    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.BallImage,   //Image
        {   //Sprites
            ball: {
                position: Vector2.new(0, 0),
                size: Vector2.new(40, 40),
                columns: 1,
                rows: 1,
            },
        },
        {   //Animations
            ball: {
                sprite: "ball",
                speed: 0, //Per frame
                keyFrames: [0], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );
}