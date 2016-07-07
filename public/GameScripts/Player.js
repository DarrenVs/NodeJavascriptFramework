"use strict";

var PlayerProperties = {
    
    readyPlayersAmount: 0,
    
    //the players that are ready and playing the game
    activePlayers: {},
    
    //all the players that currently exist in the lobby
    existingPlayers: {},
    
    ready: false,
    
    checkHost: function() {
        for (var index in connectionList) {
            return index == clientID;
        }
    },
    
    checkGameOver: function() {
        var alivePlayers = 0;
        
        for(var player in PlayerProperties.activePlayers) {
            if(PlayerProperties.activePlayers[player].health > 0)
                alivePlayers++;
        }
        
        if(alivePlayers <= 1)
            return true;
        else 
            return false;
    },
    
    findClientPlayer: function() {
        for(i in PlayerProperties.existingPlayers) {
            if(PlayerProperties.existingPlayers[i].creatorID == clientID)
                return PlayerProperties.existingPlayers[i];
        }
    }
};

Enum.ClassName[Enum.ClassType.Player] = Player;

// BaseClass
function Player(properties) {
    this.health = 100;
    
    GameObject(this, properties);
    var self = this;
    self.ClassType = Enum.ClassType.Player;
    
    var pCount = Object.keys(PlayerProperties.activePlayers).length;
    var sprites = Enum.Images.Sprites;
    
    
    
    this.DrawObject = new Sprite(
        this,   //Parent

        pCount == 0 ? sprites.PlayerSpriteSheetBlue : 
        pCount == 1 ? sprites.PlayerSpriteSheetRed : 
        pCount == 2 ? sprites.PlayerSpriteSheetPurple : 
        sprites.PlayerSpriteSheetBrown,

        {   //Sprites
            
            walk: {
                position: Vector2.new(0, 147+190+229+321),
                size: Vector2.new(351, 229),
                columns: 7,
                rows: 3,
            },
            jumpStart: {
                position: Vector2.new(0, 0),
                size: Vector2.new(286, 147),
                columns: 5,
                rows: 2, 
            },
            inAir: {
                position: Vector2.new(0, 147),
                size: Vector2.new(276, 190),
                columns: 5,
                rows: 3,
            },
            backOnGround: {
                position: Vector2.new(0, 147 + 190),
                size: Vector2.new(237, 229),
                columns: 4,
                rows: 3,
            },
            doubleJump: {
                position: Vector2.new(0, 147 + 190 + 229),
                size: Vector2.new(329, 321),
                columns: 4,
                rows: 4
            },
            slide: {
                position: Vector2.new(0, 229 + 147 + 190 + 229+ 321),
                size: Vector2.new(29, 66),
                columns: 1,
                rows: 1
            },
        },
        
        {   //Animations
            walk: {
                sprite: "walk",
                speed: .3, //Per frame
                keyFrames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
            jumpStart: {
                sprite: "jumpStart",
                speed: .8, //Per frame
                keyFrames: [0,1,2,3,4,5,6, 7, 8], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
            inAir: {
                sprite: 'inAir',
                speed: .3,
                keyFrames: [0,1,2,3,4,5,6,7,8,9,10,11,12],
                currentKeyFrame: 0,
                loop: true
            },
            backOnGround: {
                sprite: 'backOnGround',
                speed: .8,
                keyFrames: [0,1,2,3,4,5,6,7,8,9,10],
                currentKeyFrame: 0,
                loop: true,
            },
            doubleJump: {
                sprite: 'doubleJump',
                speed: .5,
                keyFrames: [0,1,2,3,4,5,6,7,8,9,10, 11, 12, 13, 14],
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
    
    this.extends = {
        physics:Physics(this),
        collision:Collision(this),
        tank:Tank(this),
    };
    
    if (clientID == self.creatorID) {

        self.extends.navigation = new StateMachine(self, StatesEnum.inAir, 
            PlayerStates.Setup(self), 
            new PlayerStates.AnyState(self), 
            false);
        self.extends.pickupStates = new StateMachine(self, StatesEnum.idle, null, null, false);
        
        //-----Adding the navigation states!!!-----\\
        var navSM = this.extends.navigation;
        navSM.AddState(StatesEnum.wander, new PlayerStates.Walk(self));
        navSM.AddState(StatesEnum.jump, new PlayerStates.Jump(self));
        navSM.AddState(StatesEnum.specialJump, new PlayerStates.WallJump(self));
        navSM.AddState(StatesEnum.extraJump, new PlayerStates.ExtraJump(self));
        navSM.AddState(StatesEnum.slide, new PlayerStates.Slide(self));
        navSM.AddState(StatesEnum.stun, new PlayerStates.Stagger(self));
        navSM.AddState(StatesEnum.inAir, new PlayerStates.InAir(self));

        //-----Adding the pickup states!!!-----\\
        var pickupSM = this.extends.pickupStates;
        pickupSM.AddState(StatesEnum.idle, new PickupStates.idle(self));
        pickupSM.AddState(StatesEnum.invulnerabilityOnHold, new PickupStates.invulnerabilityOnHold(self));
        pickupSM.AddState(StatesEnum.invulnerabilityActivated, new PickupStates.invulnerabilityActivated(self));
        pickupSM.AddState(StatesEnum.mineOnHold, new PickupStates.mineOnHold(self));
        pickupSM.AddState(StatesEnum.ballOnHold, new PickupStates.ballOnHold(self));
        pickupSM.AddState(StatesEnum.throwAbleOnHold, new PickupStates.throwAbleOnHold(self));
    
        self.pickupDelegate = {};
        
        self.collisionEnter["pickupCollision"] = function(Obj) {
            if(Obj.ClassType == Enum.ClassType.Pickup) {
                var number = Math.floor(Math.random() * Obj.pickupChoices.length);
                pickupSM.ChangeState(Obj.pickupChoices[number].state);
                
                for (i in self.pickupDelegate) {
                    self.pickupDelegate[i](Obj.pickupChoices[number].name);
                }
            }
        };
        
        self.clearPickupUI = function() {
            for (i in self.pickupDelegate) {
                self.pickupDelegate[i]("None");
            }
        }
    }
    
    PlayerProperties.existingPlayers[self.creatorID] = self;
    
    self.position = new Vector2.new(canvas.width / 2, canvas.height / 1.3);
    
    this.DrawObject.currentAnimation = "walk";
    
    this.anchored = false;
    
    this.size = Vector2.new(40, 45);
    
    this.colliderType = Enum.colliderType.box;

    this.mass = 1;

    this.hitbox = Vector2.new(self.size.x * 0.5, self.size.y + 5);
    this.DrawObject.spriteSize =  self.size;
    
    self.DrawObject.spriteOffset = Vector2.new(0, 3);

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
    
    var readySign = new ReadySign({
        position: Vector2.new(0, -40),
    });
    
    var updateRate = 0;
    //The .update is a update that fires every frame, we use this for AI or playermovement
    this.update["playerUpdate"] = function() {
        if (self.creatorID == clientID) {
            sendObject(self, false, true);
        } else {
            self.health--;
        }
        
        if(!PlayerProperties.ready && INPUT_CLICK["82"]) {
            PlayerProperties.ready = true;
            sendEvent("playerReady", {
                playerID: this.creatorID,
            });
            
            if(Object.keys(connectionList).length != 1) 
                self.addChild(readySign);
        }
    }
    
    this.removeReadySign = function() {
        readySign.destroy();
    }
    
    var clientSign = new ClientSign({
        position: Vector2.new(0, -60),
    });
    
    this.addClientSign = function() {
        if(Object.keys(connectionList).length != 1) {
            var clientSignExists = false;
            
            for(var i in self.childs) {
                if(self.childs[i] == clientSign)
                    clientSignExists = true;
            }
            
            if(!clientSignExists)
                self.addChild(clientSign);
        }
    }
    
    if (clientID == self.creatorID && Object.keys(connectionList).length != 1)
        this.addClientSign();    
    
    this.manualDestroy = function() {
        if(self.creatorID == clientID && PlayerProperties.checkGameOver())
            sendEvent("restartGame", {});
        
        self.health = 0;
    }
    

    
    this.die = function() { 
        //remove myself from the player lists
        delete PlayerProperties.activePlayers[self.creatorID];
        delete PlayerProperties.existingPlayers[self.creatorID];
        
        //set health on zero and send to other players, so my player on other clients get destroyed too
        self.Health = 0;
        sendObject(self);
        
        self.destroy();
    }
}