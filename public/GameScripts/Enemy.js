Enum.ClassName[Enum.ClassType.Enemy] = Enemy;

var enemyList = {};

function Enemy(properties) {
    this.health = 100;
    this.triggered = false;
    this.target = undefined;
    
    GameObject(this, properties);
    
    this.extends = {
        physics: Physics(this),
        collision:Collision(this),
        AI: new StateMachine(this, StatesEnum.wander, true)
    }
    
    this.hitbox = this.size;
    this.ClassType = Enum.ClassType.Enemy;
    
    var sm = this.extends.AI;
    sm.AddState(StatesEnum.wander, new EnemyStates.NormalWander(350));
    sm.AddState(StatesEnum.specialWander, new EnemyStates.AngryWander(500));
    sm.AddState(StatesEnum.alert, new EnemyStates.Enrage(15, 15));
    sm.AddState(StatesEnum.charge, new EnemyStates.Charge(20, 5, 5));
    sm.AddState(StatesEnum.interact, new EnemyStates.Attack());
    
    var self = this;
    
    //---Trigger-collider----\\
    this.addChild(new EmptyObject({
       position: Vector2.new(),
       size: Vector2.new(600, 10),
       colour: "rgba(0, 0, 0, 0.2)", 
       ID: "Trigger",
    }));
    
    var trigger = this.childs[clientID + ":Trigger"];
    
    trigger.extends = {
        collision:Collision(trigger),
    }
    
    trigger.hitbox = trigger.size;
    trigger.collisionActive = false;
    
    trigger.collisionEvents["Triggered"] = function (Obj) {
        if (Obj.ClassType == Enum.ClassType.Player) {
            console.log("GOT TRIGGERED!!!"); 
            self.triggered = true;
            target = Obj;
        } //else self.triggered = false;
    }
    
    //---End-trigger-collider----\\
    
    //---Edge-checkers---\\
    this.addChild(new EmptyObject({
        position: Vector2.new(self.size.x / 2, self.size.y / 2),
        size: Vector2.new(2, 5),
        colour: "black",
        ID: "EdgeRight"
    }));
    this.addChild(new EmptyObject({
        position: Vector2.new(-self.size.x / 2, self.size.y / 2),
        size: Vector2.new(2, 5),
        colour: "black",
        ID: "EdgeLeft"
    }));
    
    var ERight = this.childs[clientID + ":EdgeRight"];
    var ELeft = this.childs[clientID + ":EdgeLeft"];
    
    ERight.extends = {
        collision: ExtraCollision(ERight)
    }
    ELeft.extends = {
        collision: ExtraCollision(ELeft)
    }
    
    ERight.hitbox = ERight.size;
    ELeft.hitbox = ELeft.size;
    
    ERight.collisionActive = false;
    ELeft.collisionActive = false; 
    
    ERight.onCollisionExit["outOfPlaftormRight"] = function (Obj) {
        if (Obj.ClassType == Enum.ClassType.Terrain) {
            //console.log('leaving platform');
        }
    };
    
    ELeft.onCollisionExit["outOfPlaftormLeft"] = function (Obj) {
        if (Obj.ClassType == Enum.ClassType.Terrain) {
            //console.log('leaving platform');
        }
    };
}