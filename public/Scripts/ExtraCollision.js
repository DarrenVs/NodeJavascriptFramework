// Sub Class
function ExtraCollision(Parent) {
    var Parent = Parent;
    
    if (!Parent.extends) Parent.extends = {};
    Parent.extends["collision"] = Collision(Parent);
    
    
    Parent.extends = {
        collision:Collision(Parent)
    };
    
    Parent.extraCollisionEvents = Parent.extraCollisionEvents || {};
    
    
    var currentCollisions = {};
    
    var oldCollisions = {};
    
    Parent.collisionEvents["extraCollision"] = function(Obj, direction, force, distance) { 
        
        currentCollisions[Obj.ID] = { Obj:Obj, direction:direction, force:force, distance:distance};
        
        //console.log("Current Collision: ")
        //console.log(Obj);
        
        //if the collision didnt exist yet
        if (!oldCollisions[Obj.ID]) {
            
            Parent.extraCollisionEvents["onCollisionEnter"](Obj, direction, force, distance);
            
        } else {//else the collision still exists
            
            Parent.extraCollisionEvents["onCollisionStay"](Obj, direction, force, distance);
            
        }
        
    }
    
    Parent.update["collisionListUpdate"] = function() {
        //console.log("Enter Frame");
        //console.log(currentCollisions);
        //console.log(oldCollisions);
        for(var oldColl in oldCollisions) {
            var isDuplicate = false;
            //console.log("check: ")
            //console.log(oldCollisions[oldColl]["Obj"]);
            for(var newColl in currentCollisions) {
                //console.log("compare : ")
                //console.log(currentCollisions[newColl]["Obj"]);

                //if the object still exists, we return here
                if(currentCollisions[newColl]["Obj"] == oldCollisions[oldColl]["Obj"]) { 
                    //console.log("isDuplicate true");
                    isDuplicate = true;
                }
            }
            
            
            if(!isDuplicate) {
                //if we reach this code, the collision no longer exists, and we need to remove it.        
                Parent.extraCollisionEvents["onCollisionExit"](oldCollisions[oldColl]["Obj"], oldCollisions[oldColl]["direction"], oldCollisions[oldColl]["force"], oldCollisions[oldColl]["distance"]);
            }
            
            
        }
        
        oldCollisions = currentCollisions
        currentCollisions = {};
        //console.log("exit frame");
    }
       
    Parent.extraCollisionEvents["onCollisionEnter"] = function( Obj, direction, force, distance ) {
        //console.log("Enter Obj : ");
        //console.log(Obj);
    }
    
    Parent.extraCollisionEvents["onCollisionStay"] = function( Obj, direction, force, distance ) {
        //console.log("Stay");
    }
        
    Parent.extraCollisionEvents["onCollisionExit"] = function( Obj, direction, force, distance ) {
        //console.log("Exit Obj : ");
        //console.log(Obj);
    }
}