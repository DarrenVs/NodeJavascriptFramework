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
        AI: new StateMachine(self, StatesEnum.wander, true)
    }
    
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
    
    trigger.collisionEvents["Triggered"] = function (Obj) {
        if (Obj.ClassType == Enum.ClassType.Player) {
            console.log("GOT TRIGGERED!!!"); 
            self.triggered = true;
            target = Obj;
        } //else self.triggered = false;
    }
    
    //---End-trigger-collider----\\
    
    //---Edge-checkers---\\
    self.addChild(new EmptyObject({
        position: Vector2.new(self.size.x / 2, self.size.y / 2),
        size: Vector2.new(2, 5),
        colour: "black",
        ID: "EdgeRight"
    }));
    self.addChild(new EmptyObject({
        position: Vector2.new(-self.size.x / 2, self.size.y / 2),
        size: Vector2.new(2, 5),
        colour: "black",
        ID: "EdgeLeft"
    }));
    
    var EdgeRight = self.childs[clientID + ":EdgeRight"];
    var EdgeLeft = self.childs[clientID + ":EdgeLeft"];
    
    EdgeRight.extends = {
        collision: ExtraCollision(EdgeRight)
    }
    EdgeLeft.extends = {
        collision: ExtraCollision(EdgeLeft)
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
    
    /*
    EdgeRight.onCollisionEnter["enter"] = function(Obj, Dir) {console.log("enter"); } 
    EdgeRight.onCollisionStay["stay"] = function(Obj, Dir) {console.log("stay"); }
    EdgeRight.onCollisionExit["Exitl"] = function(Obj, Dir) {console.log("Exit"); }
    */
}