Enum.ClassName[Enum.ClassType.Enemy] = EnemyBase;

var enemyList = {};

function EnemyBase(properties, _self) {
    var self = _self;
    
    self.health = 100;
    self.triggered = false;
    self.target = undefined; 

    GameObject(self, properties);
    
    self.extends = {
        physics: Physics(self),
        collision:Collision(self),
        AI: new StateMachine(self, StatesEnum.wander, null, null, true)
    }
    
    self.anchored = false;
    self.hitbox = self.size;
    self.ClassType = Enum.ClassType.Enemy;
    
    //---Trigger-collider----\\
    var trigger = new EmptyObject({
       size: Vector2.new(600, 10),
       colour: "rgba(0, 0, 0, 0.2)", 
       ID: "Trigger",
    });
        
    trigger.extends = {
        collision:Collision(trigger),
    }
    
    trigger.hitbox = trigger.size;
    trigger.collisionActive = false

    trigger.update["test"] = function () {
        trigger.position = trigger.position;
    }
    
    trigger.collisionEnter["Triggered"] = function (Obj) {
        //console.log("collisiong with something");
        if (Obj.ClassType == Enum.ClassType.Player) {
            self.triggered = true;
            self.target = Obj;
        } 
    }
    trigger.collisionExit["notTriggered"] = function (Obj) {
        //console.log("collisiong with something");
        
        if (Obj.ClassType == Enum.ClassType.Player) {
            self.triggered = false;
            self.target = undefined;
        } 
    }
    
    self.addChild(trigger);
    //---End-trigger-collider----\\
    
    //---Edge-checkers---\\
    EdgeRight = new EmptyObject({
        position: Vector2.new(self.size.x / 2, self.size.y / 2),
        size: Vector2.new(2, 5),
        colour: "black",
        ID: "EdgeRight"
    });
    EdgeLeft = new EmptyObject({
        position: Vector2.new(-self.size.x / 2, self.size.y / 2),
        size: Vector2.new(2, 5),
        colour: "black",
        ID: "EdgeLeft"
    });
    
    EdgeRight.extends = {
        collision: Collision(EdgeRight)
    }
    EdgeLeft.extends = {
        collision: Collision(EdgeLeft)
    }
    
    EdgeRight.hitbox = EdgeRight.size;
    EdgeLeft.hitbox = EdgeLeft.size;
    
    EdgeRight.collisionActive = false;
    EdgeLeft.collisionActive = false; 
    
    //console.log(EdgeRight.extends);
    //console.log(EdgeLeft.extends);
    EdgeRight.collisionExit["exit"] = function (Obj, Dir) {
        //if (Obj.ClassType == Enum.ClassType.Terrain) {
            console.log('leaving platform');
        //}
    };
    
    EdgeLeft.collisionExit["exit"] = function (Obj, Dir) {
        //if (Obj.ClassType == Enum.ClassType.Terrain) {
            console.log('leaving platform');
        //}
    };    
    
    self.addChild(EdgeRight);
    self.addChild(EdgeLeft);
    
    /*
    EdgeRight.onCollisionEnter["enter"] = function(Obj, Dir) {console.log("enter"); } 
    EdgeRight.onCollisionStay["stay"] = function(Obj, Dir) {console.log("stay"); }
    EdgeRight.onCollisionExit["Exitl"] = function(Obj, Dir) {console.log("Exit"); }
    */
}