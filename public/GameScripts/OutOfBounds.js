// Sub Class
function OutOfBounds(Parent) {
    var Parent = Parent;
    
    Parent.collisionEvents["outOfBounds"] = function(Obj) {
        if (Obj.ClassType == Enum.ClassType.Boundary) {
            Parent.OutOfBounds();
        }
    }
    
    Parent.OutOfBounds = function() {
        console.log("Player died, Out of Bounds");
        Parent.destroy();
    }
    
    return true;
}