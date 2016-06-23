Enum.ClassName[Enum.ClassType.Ball] = Ball;

// BaseClass
function Ball(properties) {
    var self = this;
    GameObject(this, properties);
    
    this.extends = {
        collision:Collision(this),
        physics:Physics(this),
    };
    
    self.liveTime = 1000;
    self.ClassType = Enum.ClassType.Ball;
    
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
    
    this.update["ballLifeTime"] = function() {
        self.lifeTime -= RENDERSETTINGS.renderTime;
        if (self.lifeTime <= 0)
            self.destroy();
    }
    
    var direction = 1;
    
    self.velocity = new Vector2.new(400 * direction, -600);
    
    var bounceStrength = 130;
    
    self.update["ballSendObject"] = function() {
        if(self.creatorID == clientID) {
            sendObject(self, false, true);
        }
    }
    
    self.collisionStay["physics"] = function(Obj, direction, force, distance, canCollide, collisionFrames) {
       
        if(!self.anchored && canCollide && collisionFrames >= 5) {
            self.velocity = Vector2.subtract(
                self.velocity,
                // +
                Vector2.add(
                    Vector2.multiply(
                        direction,
                        // *
                        Vector2.new( -Math.abs(self.velocity.x), -Math.abs(self.velocity.y) )
                    ),
                    // *
                    Vector2.multiply(
                        direction,
                        // *
                        -bounceStrength
                    )
                )
            )
        }
        
        if(Obj.ClassType == Enum.ClassType.Player) {
            console.log("doStagger");
            Obj.doStagger = true;
            self.destroy();
        }
    }
}