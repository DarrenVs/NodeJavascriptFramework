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
    
    var yOffSet = 75;
    
    this.update["boundaryUpdate"] = function() {
        self.position = Vector2.new( canvas.width / 2, -self.stage.getGlobalPos(self.stage).y + canvas.height + yOffSet );
    }
    
    this.collisionStay["outOfBounds"] = function(Obj) {
        if(Obj.manualDestroy != undefined) {
            Obj.manualDestroy();
            
            if(PlayerProperties.checkGameOver()) {
                self.destroy();
                console.log("boundary destroys self");
            }
                
        } else {
            Obj.destroy();
        }
    }
}