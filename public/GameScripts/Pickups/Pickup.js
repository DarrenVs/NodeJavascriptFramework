var PickupProperties = {
    
    currentPickups: {},
    
    pickupChoices: [
        StatesEnum.invulnerabilityOnHold,
        StatesEnum.ballOnHold,
        StatesEnum.mineOnHold,
        StatesEnum.throwAbleOnHold,
    ],
    
    choosePickupValue: function(pickupID) {
        var pickupValue = this.pickupChoices[Math.floor(Math.random() * this.pickupChoices.length)];
        
        console.log("sendpickup");
        EventQue["sendPickup"] = {
            pickupValue: pickupValue,
            pickupID: pickupID,
        }
    },
    
    assignPickup: function(pickupValue, pickupID) {
        console.log(pickupID);
        this.currentPickups[pickupID].pickupValue = pickupValue;
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
    
    var pickupValue;
    
    var pickupIndex = 0;
    
    self.collisionActive = false;
    self.canCollide = false;
    self.ClassType = Enum.ClassType.Pickup;
    
    for(var index in PickupProperties.currentPickups) {
        pickupIndex++;
    }
    
    PickupProperties.currentPickups[pickupIndex] = self;
    
    if(PlayerProperties.checkHosts()) {
        console.log("index = " + pickupIndex);
        PickupProperties.choosePickupValue(pickupIndex);
    }
    
    this.collisionEnter["destroyPickupOnCollision"] = function(Obj) {
        if(Obj.ClassType == Enum.ClassType.Player) {
            delete PickupProperties.currentPickups[pickupIndex];
            self.destroy();
        }
    }
}