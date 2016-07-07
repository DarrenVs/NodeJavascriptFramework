Enum.ClassName[Enum.ClassType.ReadySign] = ReadySign;

// BaseClass
function ReadySign(properties) {
    var self = this;
    GameObject(this, properties);
    
    self.ClassType = Enum.ClassType.ReadySign;
    
    var health = 80;
    
    self.size = new Vector2.new(20,20);
    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.PlayerReadySprite,   //Image
        {   //Sprites
            PlayerReadyImage: {
                position: Vector2.new(0, 0),
                size: Vector2.new(25, 25),
                columns: 1,
                rows: 1,
            },
        },
        {   //Animations
            PlayerReadyImage: {
                sprite: "PlayerReadyImage",
                speed: 0, //Per frame
                keyFrames: [0], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );
    
    this.update["readySignSending"] = function() {
        if (self.creatorID == clientID) {
            sendObject(self);
        } else {
            health--;
            if(health <= 0)
                self.destroy();
        }
    }
}