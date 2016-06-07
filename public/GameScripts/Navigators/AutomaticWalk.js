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
    
    Parent.collisionEnter["TurnAround"] = function(Obj, Dir) { 
        
        if(Math.abs(Obj.position.y - Parent.position.y) < Parent.hitbox.y/2) {
            
            Parent.walkSpeed *= -1;
        }
    }
        
}