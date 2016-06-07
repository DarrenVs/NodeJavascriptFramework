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
    
    self.hitbox = Vector2.new(self.size.x, self.size.y);
    
    this.collisionEnter["IntermediatePlatformStay"] = function(Obj, Dir) {
        if (Obj.ClassType == Enum.ClassType.Player && Obj.position.y < self.position.y) {
            self.position.y -= 40; 
        }
    }
}