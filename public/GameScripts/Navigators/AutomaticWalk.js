// Sub Class Navigator
function AutomaticWalk(Parent) {
    var Parent = Parent;
    
    //to know if we should walk
    this.autoWalk = true;
    
    //the speed, and also used for the direction of the animation
    this.walkSpeed = 3;
    
    Parent.update["NavigationUpdate"] = function() {
        
        if (autoWalk) {
            Parent.position.x += walkSpeed    
        }     
    }
    
    if (!Parent.collisionEvents) Parent.collisionEvents = {};
    Parent.collisionEvents["TurnAround"] = function(Obj, Dir) { 
        
        if(Dir.x != 0) {
            walkSpeed *= -1;
        }
    }
        
}