// Sub Class
function OutOfBounds(Parent) {
    var Parent = Parent;
    
    Parent.collisionEvents["outOfBounds"] = function(Obj) {
        if (Obj.ClassType == Enum.ClassType.Boundary) {
            Parent.OutOfBounds();
        }
    }
    
    Parent.OutOfBounds = function() {
        console.log("IM DEAD");
        Parent.destroy();
    }
    
    return true;
}