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
        AI: new StateMachine(self, StatesEnum.wander, EnemyStates.Setup(self), new EnemyStates.AnyState(self), true)
    }
/*
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.EnemyAnimationsSheet,   //Image
        
        {   //Sprites
            
            walk: {
                position: Vector2.new(0, 0),
                size: Vector2.new(471, 229),
                columns: 5,
                rows: 4,
            },
            charge: {
                position: Vector2.new(0, 229),
                size: Vector2.new(486, 541),
                columns: 5,
                rows: 6
            },
            attack: {
                position: Vector2.new(0, 229 + 541),
                size: Vector2.new(471, 721),
                columns: 5,
                rows: 8
            }
        },
        
        {   //Animations
            walk: {
                sprite: "walk",
                speed: .3, //Per frame
                keyFrames: [0,1,2,3,4,5,6,7,8], //AnimationFrame 
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
            charge: {
                sprite: "charge",
                speed: .3,
                keyFrames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],
                currentKeyFrame: 0,
                loop: true
            },
            attack: {
                sprite: "attack",
                speed: .3,
                keyFrame: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39],
                loop: true
            }
        }
    );
    */
    self.anchored = false;
    self.hitbox = self.size;

    self.hitFloor = true;
    self.collisionEnter["collHit"] = function (Obj, dir, force, distance, canCollide) {
        self.hitFloor = true;
        if (Obj.ClassType == Enum.ClassType.Player) {
            self.destroy();
        }
    } 
    
    //---Trigger-collider----\\
    self.trigger = new EmptyObject({
       size: Vector2.new(600, 10),
       color: "rgba(0, 0, 0, 0.0)", 
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
        if (Obj.ClassType == Enum.ClassType.Player) {
            self.triggered = true;
            self.target = Obj;
            //console.log("got triggered " + Obj.ClassType);
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
        color: "black",
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