Enum.ClassName[Enum.ClassType.IntermediatePlatform] = IntermediatePlatform;

// BaseClass
function IntermediatePlatform(properties) {
    var self = this;
    GameObject(this, properties);
    
    this.extends = {
        collision:Collision(this),
    };
    
    console.log(self.position.x);
    
    self.ClassType = Enum.ClassType.IntermediatePlatform;
    self.colliderType = Enum.colliderType.box;
    
    self.anchored = true;
    
    self.hitbox = Vector2.new(self.size.x, self.size.y);
    
    for(var i in playerList) {
        self.ignoreObjectIDs[playerList[i].ID] = true;
    }
    
    this.collisionStay["IntermediatePlatformStay"] = function(Obj, direction, force, distance, canCollide, collisionFrames) {
        
        if(self.ignoreObjectIDs[Obj.ID] != undefined && collisionFrames >= 2){
            
            if (Obj.position.y < self.position.y && !CheckCollision(Obj, self, RENDERSETTINGS.deltaTime)) {
                
                delete self.ignoreObjectIDs[Obj.ID];
            }
        } 
    }
}