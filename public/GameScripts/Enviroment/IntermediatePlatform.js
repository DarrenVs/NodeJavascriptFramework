Enum.ClassName[Enum.ClassType.IntermediatePlatform] = IntermediatePlatform;

// BaseClass
function IntermediatePlatform(properties) {
    var self = this;
    GameObject(this, properties);
    
    this.extends = {
        collision:Collision(this),
    };
    
    self.ClassType = Enum.ClassType.IntermediatePlatform;
    self.colliderType = Enum.colliderType.box;
    
    self.anchored = true;
    
    self.size = new Vector2.new(canvas.width, 10),
    
    self.hitbox = Vector2.new(self.size.x, self.size.y);
    
    for(var i in PlayerProperties.playerList) {
        self.ignoreObjectIDs[PlayerProperties.playerList[i].ID] = true;
    }
    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.IntermediatePlatform,   //Image
        {   //Sprites
            intermediatePlatform: {
                position: Vector2.new(0, 0),
                size: Vector2.new(2501, 42),
                columns: 1,
                rows: 1,
            },
        },
        {   //Animations
            intermediatePlatform: {
                sprite: "intermediatePlatform",
                speed: 0, //Per frame
                keyFrames: [0], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );
    
    this.collisionExit["IntermediatePlatformExit"] = function(Obj, direction, force, distance, canCollide, collisionFrames) {
       
        if(self.ignoreObjectIDs[Obj.ID] != undefined){
           
            if (Obj.position.y < self.position.y && !CheckCollision(Obj, self, RENDERSETTINGS.deltaTime)) {
               
                delete self.ignoreObjectIDs[Obj.ID];
            }
        }
    }
}