Enum.ClassName[Enum.ClassType.Boundary] = Boundary;

// BaseClass
function Boundary(properties) {
    var self = this;
    GameObject(this, properties);
    
    self.ClassType = Enum.ClassType.Boundary;
    self.position.x = canvas.width / 2;
    self.colliderType = Enum.colliderType.box;
    
    self.hitbox = Vector2.new(self.size.x, self.size.y);
    
    var yOffSet = 10;
    
    this.update["boundaryUpdate"] = function() {
        self.position.y = -self.stage.position.y + canvas.height + yOffSet;
    }
}