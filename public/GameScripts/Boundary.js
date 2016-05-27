Enum.ClassName[Enum.ClassType.Boundary] = Boundary;

// BaseClass
function Boundary(properties) {
    var self = this;
    GameObject(this, properties);
    
    self.position.x = canvas.width / 2;
    self.colliderType = Enum.ColliderType.box;
    
    self.hitbox = Vector2.new(self.size.x, self.size.y);
    
    self.position = new Vector2.new(canvas.width/2, canvas.height/2);
    
    this.update["boundaryUpdate"] = function() {
        //self.position.y = canvas.height + self.size.y / 2 + 10;
    }
}