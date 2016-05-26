// Sub Class
function OutOfBounds(Parent) {
    var Parent = Parent;
    
    this.collisionEvents["outOfBounds"] = function(Obj) {
        if (Obj.ClassType == Enum.ClassType.Boundary) {
            OutOfBounds();
        }
    }
    
    this.OutOfBounds = function() {
        print("IM DEAD");
        Parent.destroy();
    }
    
    return true;
}