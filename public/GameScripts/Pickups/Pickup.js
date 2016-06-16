var PickupProperties = {
    
    currentPickups: {},
    
    pickupChoices: {
        1: StatesEnum.invulnerabilityOnHold,
        2: StatesEnum.mineOnHold,
        //3: StatesEnum.ballOnHold,
        //4: sStatesEnum.throwAbleOnHold,
    },
    
    choosePickupKey: function(pickupID) {
        var pickupChoicesIndex = 0;
        for(var pc in this.pickupChoices) {
            pickupChoicesIndex++;
        }
        
        var pickupKey = Math.floor(Math.random() * pickupChoicesIndex);
        
        sendEvent("sendPickup", {
            pickupKey: pickupKey,
            pickupID: pickupID,
        });
    },
    
    assignPickup: function(pickupKey, pickupID) {
        this.currentPickups[pickupID].pickupValue = this.pickupChoices[pickupKey];
        this.currentPickups[pickupID].startAnimation(pickupKey); 
    },
}

Enum.ClassName[Enum.ClassType.Pickup] = Pickup;

// BaseClass
function Pickup(properties) {
    var self = this;
    GameObject(this, properties);
    
    this.extends = {
        collision:Collision(this),
    }
    
    var pickupIndex = 0;
    
    var pickupValue;
    
    self.collisionActive = false;
    self.canCollide = false;
    self.ClassType = Enum.ClassType.Pickup;
    
    for(var index in PickupProperties.currentPickups) {
        pickupIndex++;
    }
    
    PickupProperties.currentPickups[pickupIndex] = self;
    
    if(PlayerProperties.checkHosts()) {
        PickupProperties.choosePickupKey(pickupIndex);
    }
    
    this.collisionEnter["destroyPickupOnCollision"] = function(Obj) {
        console.log(Obj);
        if(Obj.ClassType == Enum.ClassType.Player) {
            delete PickupProperties.currentPickups[pickupIndex];
            self.destroy();
        }
    }
    
    this.startAnimation = function(pickupKey) {
        this.DrawObject = new Sprite(
            this,   //Parent
            Enum.Images.Sprites.Pickups[pickupKey].SpriteSheet,   //Image
            {   //Sprites
                pickupAnimation: {
                    position: Vector2.new(0, 0),
                    size: Enum.Images.Sprites.Pickups[pickupKey].Size,
                    columns: Enum.Images.Sprites.Pickups[pickupKey].Columns,
                    rows: Enum.Images.Sprites.Pickups[pickupKey].Rows,
                },
            },
            {   //Animations
                pickupAnimation: {
                    sprite: "pickupAnimation",
                    speed: .3, //Per frame
                    keyFrames: Enum.Images.Sprites.Pickups[pickupKey].Keyframes, //AnimationFrame
                    currentKeyFrame: 0, //Where to start
                    loop: true, //Should it loop? (WIP!)
                },
            }
        );
    }
}