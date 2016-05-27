// Sub Class
function OutOfBounds(Parent) {
    var Parent = Parent;
    
    Parent.collisionEvents["outOfBounds"] = function(Obj) {
        print(Obj.ClassType);
        if (Obj.ClassType == Enum.ClassType.Boundary) {
            Parent.OutOfBounds();
        }
    }
    
    Parent.OutOfBounds = function() {
        print("IM DEAD");
        Parent.destroy();
    }
    
    return true;
}