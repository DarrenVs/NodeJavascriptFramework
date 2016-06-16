function addToPhysicsLoop( Obj ) {
    
    if (Obj.stage) {
        Obj.stage.PhysicsLoop[Obj.ID] = Obj;

        for (var i in Obj.childs) {

            if (Obj.childs[i].extends.physics)
                addToPhysicsLoop(Obj.childs[i]);
        }
    }
}


// Sub Class
function Physics(Parent) {
    var Parent = Parent;
    
    
    //Parent.bouncyness = 0;
    //Parent.friction = 0;
    Parent.velocity = Parent.velocity || new Vector2.new(0, 0);
    Parent.rotateVelocity = Parent.rotateVelocity || 0;
    
    
    Parent.Anchored = Parent.anchored || false;

    
    Parent.__defineGetter__('anchored', function() {
        return Parent.Anchored
    });
    Parent.__defineSetter__('anchored', function(val) {
        Parent.Anchored = val;
        
        if (val && Parent.stage && Parent.stage.PhysicsLoop[Parent.ID])
            delete Parent.stage.PhysicsLoop[Parent.ID];
        
        else if(!val && Parent.stage != undefined && Parent.stage.PhysicsLoop[Parent.ID] == undefined)
            Parent.stage.PhysicsLoop[Parent.ID] = updatePhysics;
    });
    Parent.anchored = Parent.anchored;
    
    
    
    
    
    
    Parent.Velocity = Vector2.new();
    Parent.Velocity.X = Parent.velocity.x || 0;
    Parent.Velocity.Y = Parent.velocity.x || 0;
    
    
    Parent.__defineSetter__('velocity', function(val) {
        
        if (val != undefined && val.x != undefined && val.y != undefined && val.x != NaN && val.y != NaN) {
            Parent.Velocity.X = val.x;
            Parent.Velocity.Y = val.y;
            
            addToPhysicsLoop( Parent );
        }
    })
    Parent.__defineGetter__('velocity', function() {
        return Parent.Velocity;
    })
    
    
    
    Parent.Velocity.__defineSetter__('x', function(val) {
        
        if (val != undefined && val != NaN) {
            Parent.Velocity.X = val;
            
            addToPhysicsLoop( Parent );
        }
    })
    Parent.Velocity.__defineGetter__('x', function() {
        return Parent.Velocity.X;
    })
    
    
    
    Parent.Velocity.__defineSetter__('y', function(val) {
        
        if (val != undefined && val != NaN) {
            Parent.Velocity.Y = val;
            
            addToPhysicsLoop( Parent );
        }
    })
    Parent.Velocity.__defineGetter__('y', function() {
        return Parent.Velocity.Y;
    })
    
    
    
    
    if (!Parent.collisionStay) Parent.collisionStay = {};
    Parent.collisionStay["physics"] = function( Obj, direction, force, distance, canCollide, collisionFrames ) {
        
        if (!Parent.anchored && canCollide && collisionFrames >= 3) {
            Parent.velocity = Vector2.subtract(
                Parent.velocity,
                // +
                Vector2.multiply(
                    Vector2.multiply(
                        direction,
                        // *
                        Vector2.new( Math.abs(Parent.velocity.x), Math.abs(Parent.velocity.y) )
                    ),
                    // *
                    -force
                )
            )
            
            if (Obj.velocity && Obj.anchored == false) {
                
                Obj.velocity = Vector2.add(
                    Obj.velocity,
                    // +
                    Vector2.multiply(
                        Vector2.multiply(
                            direction,
                            // *
                            Vector2.new( Math.abs(Parent.velocity.x), Math.abs(Parent.velocity.y) )
                        ),
                        // *
                        -force
                    )
                )
            }
        }
    }
    
    return true;
}


function updatePhysics( Obj, deltaTime ) {

    if (Obj && Obj.anchored == false) {


        Obj.position = Vector2.add(
            Obj.position,
            Vector2.multiply(Obj.velocity, deltaTime)
        );

        Obj.rotation += Obj.rotateVelocity * deltaTime;


        Obj.velocity = Vector2.add(
            Vector2.subtract(
                Obj.velocity,
                Vector2.multiply(Obj.velocity, Obj.stage.airDensity)
            ),
            (Obj.stage.gravityType == Enum.gravity.global ? Obj.stage.gravity : Vector2.unit(Vector2.subtract(Obj.stage.gravity, Obj.position)))
        );
        Obj.rotateVelocity -= Obj.rotateVelocity * Obj.stage.airDensity;
    }
}