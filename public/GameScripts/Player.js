"use strict";

var PlayerProperties = {
    playerList: {},
    
    checkHosts: function() {
        for (var index in connectionList) {
            return index == clientID;
        }
    },   
};

Enum.ClassName[Enum.ClassType.Player] = Player;

// BaseClass
function Player(properties) {
    this.health = 100;
    
    GameObject(this, properties);
    var self = this;
    
    self.ClassType = Enum.ClassType.Player;
    
    this.extends = {
        physics:Physics(this),
        collision:Collision(this),
        tank:Tank(this),
        navigation: new StateMachine(self, StatesEnum.inAir, 
            PlayerStates.Setup(self), 
            PlayerStates.AnyState(self), 
            false),
        pickupStates: new StateMachine(self, StatesEnum.idle, null, null, false),
    };
    
    self.position = new Vector2.new(canvas.width / 2, canvas.height / 1.3);
    console.log("hard setted player position, dont forget");
    
    //-----Adding the states!!!-----\\
    var navSM = this.extends.navigation;
    navSM.AddState(StatesEnum.wander, new PlayerStates.Walk());
    navSM.AddState(StatesEnum.jump, new PlayerStates.Jump());
    navSM.AddState(StatesEnum.specialJump, new PlayerStates.WallJump());
    navSM.AddState(StatesEnum.slide, new PlayerStates.Slide());
    navSM.AddState(StatesEnum.stun, new PlayerStates.Stagger());
    navSM.AddState(StatesEnum.inAir, new PlayerStates.InAir());
    
    var pickupSM = this.extends.pickupStates;
    pickupSM.AddState(StatesEnum.idle, new PickupStates.idle());
    pickupSM.AddState(StatesEnum.invulnerabilityOnHold, new PickupStates.invulnerabilityOnHold());
    pickupSM.AddState(StatesEnum.invulnerabilityActivated, new PickupStates.invulnerabilityActivated());
    pickupSM.AddState(StatesEnum.mineOnHold, new PickupStates.mineOnHold());
    pickupSM.AddState(StatesEnum.ballOnHold, new PickupStates.ballOnHold());
    pickupSM.AddState(StatesEnum.throwAbleOnHold, new PickupStates.throwAbleOnHold());
    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.PlayerAnimationSheet,   //Image
        
        {   //Sprites
            
            walk: {
                position: Vector2.new(0, 0),
                size: Vector2.new(366, 397),
                columns: 5,
                rows: 4,
            },
            jumpStart: {
                position: Vector2.new(406, 0),
                size: Vector2.new(247, 298),
                columns: 3,
                rows: 3, 
            },
            inAir: {
                position: Vector2.new(545, 0),
                size: Vector2.new(481, 256),
                colmns: 6,
                rows: 3,
            },
            backOnGround: {
                position: Vector2.new(960, 0),
                size: Vector2.new(523, 193),
                colmns: 6,
                rows: 2,
            },
            doubleJump: {
                position: Vector2.new(1153, 0),
                size: Vector2.new(),
                colmns: 4,
                rows: 3
            },
            slide: {
                position: Vector2.new(1562, 0),
                size: Vector2.new(40, 96),
                colmns: 1,
                rows: 1
            },
        },
        
        {   //Animations
            run: {
                sprite: "walk",
                speed: .3, //Per frame
                keyFrames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
            jump: {
                sprite: "jumpStart",
                speed: .3, //Per frame
                keyFrames: [0,1,2,3,4,5,6], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
            inAir: {
                sprite: 'inAir',
                speed: .3,
                keyFrames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14, 15, 16],
                currentKeyFrame: 0,
                loop: true
            },
            backOnGround: {
                sprite: 'backOnGround',
                speed: .3,
                keyFrames: [0,1,2,3,4,5,6,7,8,9,10],
                currentKeyFrame: 0,
                loop: true,
            },
            doubleJump: {
                sprite: 'doubleJump',
                speed: .3,
                keyFrames: [0,1,2,3,4,5,6,7,8,9,10, 11],
                currentKeyFrame: 0,
                loop: true,
            },
            slide: {
                sprite: 'slide',
                speed: .3,
                keyFrames: [0],
                currentKeyFrame: 0,
                loop: true,
            },
        }
    );
    
    this.collisionEnter["pickupCollision"] = function(Obj) {
        if(Obj.ClassType == Enum.ClassType.Pickup) {
            console.log(Obj.pickupValue);
            pickupSM.SetState(Obj.pickupValue);
        }
    };
    
    PlayerProperties.playerList[self.creatorID] = self;
    
    this.DrawObject.currentAnimation = "run";
    
    this.anchored = false;
    
    this.size = Vector2.new(50, 50);
    
    this.colliderType = Enum.colliderType.box;
    
    this.hitbox = Vector2.new(self.size.x * 0.5, self.size.y + 5);
    
    self.ClassType = Enum.ClassType.Player;
    self.mass = 10;
    
    
    var Health = self.health;
    this.__defineGetter__('health', function() {
        return Health;
    })
    this.__defineSetter__('health', function(val) {
        Health = val;
        if (Health <= 0)
            self.die();
    })
    
    var updateRate = 0;
    //The .update is a update that fires every frame, we use this for AI or playermovement
    this.update["playerUpdate"] = function() {
        if (self.creatorID == clientID) {
            sendObject(self, false, true);
        } else {
            self.health--;
        }
    }
    
    this.manualDestroy = function() {
        self.health = 0;
    }
    
    this.die = function() {
        console.log("player dies");
        
        delete PlayerProperties.playerList[self.creatorID];
        self.Health = 0;
        sendObject(self);
        self.destroy();
    }
}