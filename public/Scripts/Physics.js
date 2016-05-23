// Sub Class
function Physics(Parent) {
    var Parent = Parent;
    
    
    
    Parent.velocity = new Vector2.new(0, 0);
    Parent.rotateVelocity = 0;

    Parent.__defineSetter__('anchored', function() {
        return Parent.Anchored
    });
    Parent.__defineSetter__('anchored', function(val) {
        Parent.Anchored = val;
        
        if (val && PhysicsLoop[Parent.ID])
            delete PhysicsLoop[Parent.ID];
        
        else if(!val && PhysicsLoop[Parent.ID] == undefined)
            PhysicsLoop[Parent.ID] = updatePhysics;
    });
    
    
    Parent.anchored = false;
    
    return true;
}


function updatePhysics( Obj, deltaTime ) {

    if (Obj && !Obj.anchored) {


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