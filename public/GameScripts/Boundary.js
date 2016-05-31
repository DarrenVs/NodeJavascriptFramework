Enum.ClassName[Enum.ClassType.Boundary] = Boundary;

// BaseClass
function Boundary(properties) {
    var self = this;
    GameObject(this, properties);
    this.extends = {
        collision:Collision(this),
    };
    
    
    
    self.ClassType = Enum.ClassType.Boundary;
    self.position.x = canvas.width / 2;
    self.colliderType = Enum.colliderType.box;
    
    self.hitbox = Vector2.new(self.size.x, self.size.y);
    
    var yOffSet = 10;
    
    this.update["boundaryUpdate"] = function() {
        self.position.y = -self.stage.position.y + canvas.height + yOffSet;
    }
    
    this.collisionEvents["outOfBounds"] = function(Obj) {
        console.log(Obj.ID + " died, Out of Bounds");
        Obj.destroy();
    }
}