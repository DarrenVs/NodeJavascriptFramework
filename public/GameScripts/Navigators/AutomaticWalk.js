// Sub Class Navigator
function AutomaticWalk(Parent, walkSpeed) {
    var Parent = Parent;
    
    //to know if we should walk
    Parent.autoWalk = true;
    
    //the speed, and also used for the direction of the animation
    Parent.walkSpeed = walkSpeed || 150;
    
    Parent.update["NavigationUpdate"] = function() {
        
        if (Parent.autoWalk) {
            Parent.velocity.x = Parent.walkSpeed;
        } 
    }
    
    if (!Parent.collisionEvents) Parent.collisionEvents = {};
    
    Parent.collisionStay["TurnAround"] = function(Obj, Dir) { 
        
        if(Dir.x != 0) {
            Parent.walkSpeed *= -1;
        }
    }
        
}