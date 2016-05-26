Enum.ClassName[Enum.ClassType.Boundary] = Boundary;

// BaseClass
function Boundary(properties) {
    var self = this;
    GameObject(this, properties);
    
    self.position.x = canvas.width / 2;
    
    this.update["boundaryUpdate"] = function() {
        self.position.x = canvas.height + self.size.y / 2 + 10;
    }
}