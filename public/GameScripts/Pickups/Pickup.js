var PickupProperties = {
    
    currentPickups: {},
    
    pickupChoices: {
        0: StatesEnum.invulnerabilityOnHold,
        1: StatesEnum.mineOnHold,
        2: StatesEnum.ballOnHold,
        3: StatesEnum.throwAbleOnHold,
    },
    
    choosePickupKey: function(pickupID) {
        var pickupKey = Math.floor(Math.random() * Object.keys(this.pickupChoices).length);
        
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
    
    self.size = new Vector2.new(60, 60);
    
    pickupIndex = Object.keys(PickupProperties.currentPickups).length;
    
    PickupProperties.currentPickups[pickupIndex] = self;
    
    if(PlayerProperties.checkHost()) {
        PickupProperties.choosePickupKey(pickupIndex);
    }
    
    this.collisionEnter["destroyPickupOnCollision"] = function(Obj) {
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