// Sub Class Navigator
function AutomaticWalk(Parent) {
    var Parent = Parent;
    
    //to know if we should walk
    Parent.autoWalk = true;
    
    //the speed, and also used for the direction of the animation
    Parent.walkSpeed = 3;
    
    Parent.update["NavigationUpdate"] = function() {
        
        if (Parent.autoWalk) {
            Parent.position.x += Parent.walkSpeed    
        } 
    }
    
    if (!Parent.collisionEvents) Parent.collisionEvents = {};
    
    Parent.collisionEvents["TurnAround"] = function(Obj, Dir) { 
        
        if(Dir.x != 0) {
            Parent.walkSpeed *= -1;
        }
    }
        
}