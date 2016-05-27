// Sub Class Navigator
function AutomaticWalk(Parent) {
    var Parent = Parent;
    
    var walkSpeed = 5;
    
    Parent.update["NavigationUpdate"] = function() {
        
        if (INPUT_CLICK[32]) {
            walkSpeed = -walkSpeed;    
        }
        
        //Parent.position.x += walkSpeed;
        
    }
        
}