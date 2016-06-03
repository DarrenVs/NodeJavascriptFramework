/*
Enum.Worlds.TestWorld = Worlds.length;

Worlds[Enum.Worlds.TestWorld] = function( stage ) {

    GameObject( this );
    
    stage.gravity = Vector2.new(0, 5);
    
    //---------------------------\\
    var enemy = new EmptyObject({
        
        position: Vector2.new( 100, 100 ),
        size: Vector2.new( 20, 20 ),
        
    });
    enemy.extends["collision"] = Collision(enemy);
    enemy.hitbox = enemy.size;
    enemy.extends["physics"] = Physics(enemy);
    
    enemy.extends["AI"] = new StateMachine(enemy, StatesEnum.wander, true);
    
    enemy.extends["AI"].AddState(StatesEnum.wander, new EnemyStates.NormalWander(80, 400));
    enemy.extends["AI"].AddState(StatesEnum.specialWander, new EnemyStates.AngryWander(120, 800));
    enemy.extends["AI"].AddState(StatesEnum.alert, new EnemyStates.Enrage(3, 200));
    enemy.extends["AI"].AddState(StatesEnum.charge, new EnemyStates.Charge(250, 20, 5));
    enemy.extends["AI"].AddState(StatesEnum.interact, new EnemyStates.Attack());
        
    //---------------------------\\    
    
    enemy.addChild(new EmptyObject({
        position: Vector2.new(0, 0),
        size: Vector2.new(300, 10),
        ID: 'AngryColl'
    }));
    
    var angryColl = enemy.childs[clientID + ":AngryColl"];
    angryColl.extends["collision"] = Collision(angryColl);
    angryColl.colour = "rgba(225,164,0,0.3)"
    
    angryColl.collisionEvents["AngryCollColl"] = function (Obj, dir) {
        
        if (Obj.ClassType == Enum.ClassType.Player) {
             console.log("player sseen");
        }
    }
    
    angryColl.hitbox = angryColl.size;
    angryColl.collisionActive = false;
    
    stage.addChild(enemy);    
           
}
*/