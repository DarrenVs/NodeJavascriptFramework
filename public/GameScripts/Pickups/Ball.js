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
    
    self.rotation = 270;
    
    self.velocity = Vector2.multiply(Vector2.fromAngle(self.rotation), -1000);
    console.log(self.velocity);
    
    self.collisionStay["ballPhysics"] = function(Obj, direction, force, distance, canCollide, collisionFrames) {
        
        if(!self.anchored && canCollide && collisionFrames >= 5) {
            self.velocity = Vector2.multiply(direction, new Vector2.new(1000,1000));
        }
        
        if(Obj.ClassType == Enum.ClassType.Player) {
            Obj.doStagger = true;
            self.destroy();
        }
    }
}