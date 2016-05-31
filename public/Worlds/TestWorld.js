Enum.Worlds.TestWorld = Worlds.length;

Worlds[Enum.Worlds.TestWorld] = function( stage ) {
    GameObject( this );
    
    stage.gravity = Vector2.new(0, 5);
    
    //---------------------------\\
    var testObject = new EmptyObject({
        
        position: Vector2.new( 100, 100 ),
        size: Vector2.new( 20, 20 ),
        
    });
    testObject.extends["collision"] = Collision(testObject);
    testObject.hitbox = testObject.size;
    testObject.extends["physics"] = Physics(testObject);
    
    testObject.extends["AI"] = new StateMachine(testObject, StatesEnum.wander, true);
    
    testObject.extends["AI"].AddState(StatesEnum.wander, new EnemyStates.NormalWander(80));
    testObject.extends["AI"].AddState(StatesEnum.specialWander, new EnemyStates.AngryWander(120));    
    testObject.extends["AI"].AddState(StatesEnum.alert, new EnemyStates.Enrage(3, 200));
    testObject.extends["AI"].AddState(StatesEnum.charge, new EnemyStates.Charge(250, 20, 5));
    testObject.extends["AI"].AddState(StatesEnum.interact, new EnemyStates.Attack());
        
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