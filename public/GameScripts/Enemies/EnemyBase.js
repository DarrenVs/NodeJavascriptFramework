"use strict";


self.enemyList = {};

function EnemyBase(_self, properties) {
    var self = _self;
    
    self.health = 100;
    self.triggered = false;
    self.target = undefined; 

    GameObject(self, properties);
    
    self.extends = {
        physics: Physics(self),
        collision:Collision(self),
        AI: new StateMachine(self, StatesEnum.wander, EnemyStates.Setup(self), new EnemyStates.AnyState(self), false)
    }
    
    self.anchored = false;
    self.hitbox = self.size;
    
    //---Trigger-collider----\\
    self.trigger = new EmptyObject({
       size: Vector2.new(600, 10),
       colour: "rgba(0, 0, 0, 0.2)", 
    });
        
    self.trigger.extends = {
        collision:Collision(self.trigger),
    }
    
    self.trigger.hitbox = self.trigger.size;
    self.trigger.collisionActive = false;
    self.trigger.canCollide = false;
    self.trigger.ignoreObjectType[Enum.ClassType.Player] = true;

    self.trigger.update["test"] = function () {
        self.trigger.position = self.trigger.position;
    }
    
    self.trigger.collisionEnter["self.triggered"] = function (Obj, direction, force, distance, canCollide ) {
        if (canCollide && Obj.ClassType == Enum.ClassType.Player) {
            self.triggered = true;
            self.target = Obj;
            console.log("got triggered");
        } 
           // console.log("collinding with someting");
    }
    self.trigger.collisionExit["notself.triggered"] = function (Obj, direction, force, distance, canCollide ) {
        
        if (canCollide && Obj.ClassType == Enum.ClassType.Player) {
            self.triggered = false;
            //self.target = undefined;
        } 
            //console.log("exit triggre hitting!");
    }
    
    self.addChild(self.trigger);
    //---End-trigger-collider----\\
    
    //---Edge-checkers---\\
    self.EdgeRight = new EmptyObject({
        position: Vector2.new(self.size.x / 2, self.size.y / 2),
        size: Vector2.new(2, 5),
        colour: "black",
    });
    self.EdgeLeft = new EmptyObject({
        position: Vector2.new(-self.size.x / 2, self.size.y / 2),
        size: Vector2.new(2, 5),
        colour: "black",
    });
    
    self.EdgeRight.extends = {
        collision: Collision(self.EdgeRight)
    }
    self.EdgeLeft.extends = {
        collision: Collision(self.EdgeLeft)
    }
    
    self.EdgeRight.hitbox = self.EdgeRight.size;
    self.EdgeLeft.hitbox = self.EdgeLeft.size;
    
    self.EdgeRight.collisionActive = false;
    self.EdgeLeft.collisionActive = false; 
    
    self.groundsHitRight = 0;   

    self.EdgeRight.collisionEnter["enter"] = function (Obj, dir, force, distance, canCollide) {
        if (canCollide) self.groundsHitRight ++;
    }
    self.EdgeRight.collisionExit["exit"] = function (Obj, dir, force, distance, canCollide) {
        if (canCollide) self.groundsHitRight--;
        if (self.groundsHitRight == 0) self.wallHitDir = -1;
        
    };

    self.groundHitLeft = 0;

    self.EdgeLeft.collisionEnter["enter"] = function (obj, dir, force, distance, canCollide) {
        if (canCollide) self.groundHitLeft ++;
    }

    self.EdgeLeft.collisionExit["exit"] = function (Obj, dir, force, distance, canCollide) {
        //console.log("exit ", self.wallHitDir, self);
        if (canCollide) self.groundHitLeft --;

        if (self.groundHitLeft == 0) self.wallHitDir = 1;
    };    
    
    self.addChild(self.EdgeRight);
    self.addChild(self.EdgeLeft);

    console.log(self);
    /*
    self.EdgeRight.onCollisionEnter["enter"] = function(Obj, Dir) {console.log("enter"); } 
    self.EdgeRight.onCollisionStay["stay"] = function(Obj, Dir) {console.log("stay"); }
    self.EdgeRight.onCollisionExit["Exitl"] = function(Obj, Dir) {console.log("Exit"); }
    */
}