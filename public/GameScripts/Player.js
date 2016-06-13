"use strict";

var PlayerProperties = {
    playerList: {},
    
    checkHosts: function() {
        for (var index in connectionList)
            return connectionList[index] == clientID;
    },   
};

Enum.ClassName[Enum.ClassType.Player] = Player;

// BaseClass
function Player(properties) {
    this.health = 100;
    
    GameObject(this, properties);
    var self = this;
    
    this.extends = {
        physics:Physics(this),
        collision:Collision(this),
        tank:Tank(this),
        navigation: new StateMachine(self, StatesEnum.inAir, 
            PlayerStates.Setup(self), 
            PlayerStates.AnyState(self), 
            false),
        //pickupStates: new StateMachine(self, StatesEnum.idle),
    };
    
    self.position = new Vector2.new(canvas.width / 2, canvas.height / 1.3);
    console.log("hard setted player position, dont forget");
    
    //-----Adding the states!!!-----\\
    var sm = this.extends.navigation;
    sm.AddState(StatesEnum.wander, new PlayerStates.Walk());
    sm.AddState(StatesEnum.jump, new PlayerStates.Jump());
    sm.AddState(StatesEnum.specialJump, new PlayerStates.WallJump());
    sm.AddState(StatesEnum.slide, new PlayerStates.Slide());
    sm.AddState(StatesEnum.stun, new PlayerStates.Stagger());
    sm.AddState(StatesEnum.inAir, new PlayerStates.InAir());
    
    /*
    var pickupSM = this.extends.pickupStates;
    pickupSM.AddState(StatesEnum.idle, new PickupStates.idle);
    pickupSM.AddState(StatesEnum.invulnerability, new PickupStates.invulnerability);
    pickupSM.AddState(StatesEnum.mine, new PickupStates.mine);
    pickupSM.AddState(StatesEnum.ball, new PickupStates.ball);
    pickupSM.AddState(StatesEnum.throwAble, new PickupStates.throwAble);
    */
    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.PlayerRunSpriteSheet,   //Image
        
        {   //Sprites
            
            playerMovement: {
                position: Vector2.new(0, 0),
                size: Vector2.new(366, 397),
                columns: 5,
                rows: 4,
            },
            jump: {
                position: Vector2.new(0, 0),
                size: Vector2.new(393, 100),
                columns: 7,
                rows: 1,
            }
        },
        
        {   //Animations
            run: {
                sprite: "playerMovement",
                speed: .3, //Per frame
                keyFrames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
            jump: {
                sprite: "jump",
                speed: .15, //Per frame
                keyFrames: [0,1,2,3,4,5,6], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );
    
    this.collisionEnter["pickupCollision"] = function(Obj) {
        if(Obj.ClassType == Enum.ClassType.Pickup) {
            //pickupSM.currentState = Obj.pickupValue;
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