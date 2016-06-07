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
    
    self.hitbox = Vector2.new(self.size.x, self.size.y);
    
    this.collisionStay["IntermediatePlatformStay"] = function(Obj, Dir) {
        console.log("yo");
        
        if (Obj.ClassType == Enum.ClassType.Player) {
            if(Math.round(Dir.y) == 1) {
                console.log("above");
                self.collisionActive = true;
            } else if(Math.round(Dir.y) == -1) {
                self.collisionActive = false;
                Obj.position.y += 4500;
                console.log("under me");
            }
        }
    }
}