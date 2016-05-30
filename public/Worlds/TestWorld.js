Enum.Worlds.TestWorld = Worlds.length;

Worlds[Enum.Worlds.TestWorld] = function( stage ) {
    GameObject( this );
    
    stage.gravity = Vector2.new(0, 9.8);
    stage.gravityType = Enum.gravity.global;
    
    //---------------------------\\
    var testObject = new EmptyObject({
        
        position: Vector2.new( 100, 100 ),
        size: Vector2.new( 20, 20 ),
    });
    
    testObject.extends["AI"] = new StateMachine(testObject, StatesEnum.wander);
    testObject.extends["collision"] = Collision(testObject);
    testObject.hitbox = testObject.size;
    
    testObject.extends["AI"].AddState(StatesEnum.wander, new States.Wander(80));
    testObject.extends["AI"].AddState(StatesEnum.alert, new States.Angry(20, 200));
    testObject.extends["AI"].AddState(StatesEnum.charge, new States.Charge(250, 20, 5));
    testObject.extends["AI"].AddState(StatesEnum.interact, new States.Attack());
        
    stage.addChild(testObject);
    //---------------------------\\    
    
    //--------------------------\\
    var wallRight = new EmptyObject({
        position: Vector2.new(0, 0),
        size: Vector2.new(10, canvas.height)
    });
    
    wallRight.extends["collision"] = Collision(wallRight);
    wallRight.hitbox = wallRight.size;
    
    stage.addChild(wallRight);
    //--------------------------\\
    
    //--------------------------\\
    var wallLeft = new EmptyObject({
        position: Vector2.new(canvas.width-10, 0),
        size: Vector2.new(10, canvas.height)
    });

    wallLeft.extends["collision"] = Collision(wallLeft);
    wallLeft.hitbox = wallLeft.size;
    
    stage.addChild(wallLeft);
    //---------------------------\\
}