// Sub Class
function ExtraCollision(Parent) {
    var Parent = Parent;
    
    if (!Parent.extends) Parent.extends = {};
    Parent.extends["collision"] = Collision(Parent);
    
    
    Parent.extends = {
        collision:Collision(Parent)
    };
    
    Parent.onCollisionEnter = Parent.onCollisionEnter || {};
    Parent.onCollisionStay = Parent.onCollisionStay || {};
    Parent.onCollisionExit = Parent.onCollisionExit || {};
    
    var currentCollisions = {};
    
    var oldCollisions = {};
    
    Parent.collisionEvents["extraCollision"] = function(Obj, direction, force, distance) { 
        
        currentCollisions[Obj.ID] = { Obj:Obj, direction:direction, force:force, distance:distance};
        
        //if the collision didnt exist yet
        if (!oldCollisions[Obj.ID]) {
            
            for (i in Parent.onCollisionEnter)
                Parent.onCollisionEnter[i](Obj, direction, force, distance);
            
        } else {//else the collision still exists
            
            for (i in Parent.onCollisionStay)
                Parent.onCollisionStay[i](Obj, direction, force, distance);
            
        }
        
    }
    
    Parent.update["collisionListUpdate"] = function() {
        
        for(var oldColl in oldCollisions) {
            var isDuplicate = false;
            for(var newColl in currentCollisions) {
                //if the object still exists, we return here
                if(currentCollisions[newColl]["Obj"] == oldCollisions[oldColl]["Obj"]) { 
                    isDuplicate = true;
                }
            }
            
            
            if(!isDuplicate) {
                
                //if we reach this code, the collision no longer exists, and we need to remove it.   
                
                for (i in Parent.onCollisionExit)
                    Parent.onCollisionExit[i](oldCollisions[oldColl]["Obj"], oldCollisions[oldColl]["direction"], oldCollisions[oldColl]["force"], oldCollisions[oldColl]["distance"]);
            }
            
            
        }
        
        oldCollisions = currentCollisions
        currentCollisions = {};
    }
       
    Parent.onCollisionEnter["onCollisionEnter"] = function( Obj, direction, force, distance ) {

    }
    
    Parent.onCollisionStay["onCollisionStay"] = function( Obj, direction, force, distance ) {

    }
        
    Parent.onCollisionExit["onCollisionExit"] = function( Obj, direction, force, distance ) {

    }
}