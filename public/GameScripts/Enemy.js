Enum.ClassName[Enum.ClassType.Enemy] = Enemy;

var enemyList = {};

function Enemy(properties) {
    this.health = 100;
    
    GameObject(this, properties);
    
    this.extends = {
        physics: Physics(this),
        collision:Collision(this),
        AI: new StateMachine(this, StatesEnum.wander, true)
    }
    
    this.hitbox = this.size;
    this.ClassType = Enum.ClassType.Enemy;
    
    var sm = this.extends.AI;
    sm.AddState(StatesEnum.wander, new EnemyStates.NormalWander(80, 350));
    sm.AddState(StatesEnum.specialWander, new EnemyStates.AngryWander(120, 500));
    sm.AddState(StatesEnum.alert, new EnemyStates.Enrage(30, 200));
    sm.AddState(StatesEnum.charge, new EnemyStates.Charge(250, 20, 5));
    sm.AddState(StatesEnum.interact, new EnemyStates.Attack());
    
    
    var self = this;
    
    //---Trigger-collider----\\
    this.addChild(new EmptyObject({
       position: Vector2.new(),
       size: Vector2.new(600, 10),
       colour: "rgba(225, 50, 0, 0.7)", 
       ID: "Trigger",
    }));
    
    var trigger = this.childs[clientID + ":Trigger"];
    
    trigger.extends = {
        physics: Physics(trigger),
        collision:Collision(trigger)
    }
    
    trigger.hitbox = trigger.size;
    trigger.collisionActive = false;
    
    trigger.collisionEvents["Triggered"] = function (Obj) {
        if (Obj.ClassType == Enum.ClassType.Player) {
            
        }
    }
    
    //---End-trigger-collider----\\
}