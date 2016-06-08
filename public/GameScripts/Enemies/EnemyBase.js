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
    self.addChild(new EmptyObject({
       position: Vector2.new(),
       size: Vector2.new(600, 10),
       colour: "rgba(0, 0, 0, 0.2)", 
       ID: "Trigger",
    }));
    
    var trigger = self.childs[clientID + ":Trigger"];
    
    trigger.extends = {
        collision:Collision(trigger),
    }
    
    trigger.hitbox = trigger.size;
    trigger.collisionActive = false;
    
    trigger.collisionEnter["Triggered"] = function (Obj) {
        if (Obj.ClassType == Enum.ClassType.Player) {
            self.triggered = true;
            self.target = Obj;
        } 
    }
    trigger.collisionExit["notTriggered"] = function (Obj) {
        if (Obj.ClassType == Enum.ClassType.Player) {
            self.triggered = false;
            self.target = undefined;
        } 
    }
    
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
        collision: ExtraCollision(EdgeRight)
    }
    EdgeLeft.extends = {
        collision: ExtraCollision(EdgeLeft)

        zet het naar nomrmale collision en dverander naar de goeie namen
    }
    
    EdgeRight.hitbox = EdgeRight.size;
    EdgeLeft.hitbox = EdgeLeft.size;
    
    EdgeRight.collisionActive = false;
    EdgeLeft.collisionActive = false; 
    
    //console.log(EdgeRight.extends);
    //console.log(EdgeLeft.extends);
    EdgeRight.onCollisionExit["exit"] = function (Obj, Dir) {
        //if (Obj.ClassType == Enum.ClassType.Terrain) {
            console.log('leaving platform');
        //}
    };
    
    EdgeLeft.onCollisionExit["exit"] = function (Obj, Dir) {
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