function Tank(Parent) {
    
    Parent.Health = Parent.Health || 100;
    
    
    Parent.Move = function(direction) {
        
        Parent.velocity = Vector2.add(Parent.velocity, direction);
    }
}