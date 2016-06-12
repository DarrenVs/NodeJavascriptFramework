var PickupProperties = {
    
    currentPickup: undefined,
    
    checkSpawnAble: function() {
        return true;  
    },
    
    choosePickupValue: function() {
        var pickupValue = Math.floor(Math.random() * 4);
        
        EventQue["sendPickup"] = {
            pickupValue: pickupValue,
        }
        
    },
    
    assignPickup: function(pickupValue) {
        this.currentPickup.pickupValue = pickupValue;
        console.log(this.currentPickup.pickupValue);
    },
    
}

Enum.ClassName[Enum.ClassType.Pickup] = Pickup;

// BaseClass
function Pickup(properties) {
    var self = this;
    GameObject(this, properties);
    
    PickupProperties.currentPickup = self; 
    
    var pickupValue;
    
    if(PlayerProperties.choosePlayer) {
        PickupProperties.choosePickupValue();
    }
}