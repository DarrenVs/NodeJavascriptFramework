// Sub Class
function ExtraCollision(Parent) {
    var Parent = Parent;
    
    if (!Parent.extends) Parent.extends = {};
    Parent.extends["collision"] = Collision(Parent);
    
    
    Parent.extends = {
        collision:Collision(Parent)
    };
    
    //Parent.onCollisionEnter = Parent.onCollisionEnter || {};
    //Parent.onCollisionStay = Parent.onCollisionStay || {};
    //Parent.onCollisionExit = Parent.onCollisionExit || {};
    
    
    var newCollisions = {};
    
    var oldCollisions = {};
    
    Parent.collisionEvents["extraCollision"] = function(Obj, direction, force, distance) { 
        
        newCollisions[Obj.ID] = {Obj, direction, force, distance};
        
        //if the collision didnt exist yet
        if (!oldCollisions[Obj.ID]) {
            
            Parent.onCollisionEnter(Obj, direction, force, distance);
            
        } else {//else the collision still exists
            
            Parent.onCollisionStay(Obj, direction, force, distance);
        }
        
    }
    
    Parent.update["collisionListUpdate"] = function() {
        
        for(var o in oldCollisions) {
            for(var n in newCollisions) {
                if(n == o) {
                    //if the object still exists, we break here
                    break;
                }
            }
            
            //if we reach this code, the collision no longer exists, and we need to remove it.
            Parent.onCollisionExit(o);
        }
        
        oldCollisions = newCollisions
        newCollisions = {};
    }
       
    Parent.onCollisionEnter = function( Obj, direction, force, distance ) {
        //console.log("Enter");
    }
    
    Parent.onCollisionStay = function( Obj, direction, force, distance ) {
        //console.log("Stay");
    }
        
    Parent.onCollisionExit = function( Obj, direction, force, distance ) {
        //console.log("Exit");
    }
    
    
    /*
    Parent.onCollisionEnter["onCollisionEnter"] = function( Obj, direction, force, distance ) {
        console.log("Enter");
    }
    
    Parent.onCollisionStay["onCollisionStay"] = function( Obj, direction, force, distance ) {
        console.log("Stay");
    }
        
    Parent.onCollisionExit["onCollisionExit"] = function( Obj, direction, force, distance ) {
        console.log("Exit");
    }
    */
}