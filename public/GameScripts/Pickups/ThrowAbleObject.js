Enum.ClassName[Enum.ClassType.ThrowAbleObject] = ThrowAbleObject;

// BaseClass
function ThrowAbleObject(properties, moveDirection) {
    var self = this;
    GameObject(this, properties);
    
    this.extends = {
        collision:Collision(this),
    };
    
    var moveSpeed = 450;
    
    self.scale.x = moveDirection;
    self.size = new Vector2.new(20,9);
    self.ClassType = Enum.ClassType.ThrowAbleObject;
    
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
    
    self.hitbox = Vector2.new(self.size.x, self.size.y);
    
    if(self.creatorID == clientID)
        sendObject(self, false, true);
    
    this.update["throwAbleMoveForward"] = function(self, deltaTime) {
        self.position.x += moveSpeed * moveDirection * deltaTime;
        
        if(self.creatorID == clientID) {
            console.log("client ID");
           sendObject(self, false, true); 
        }
    }
    
    this.collisionEnter["throwAbleObjectCollision"] = function(Obj) {
        if(Obj.ClassType == Enum.ClassType.Player)
            Obj.doStagger = true;
        
        self.destroy();
    };
}
