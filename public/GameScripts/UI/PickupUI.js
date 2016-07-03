var PickupUI = function() {
    GameObject(this);
    var self = this;
    
    self.color = "red";
    
    var pickupName = "None";
    
    var player = PlayerProperties.findClientPlayer();
    
    self.update["PickupUIUpdate"] = function() {
        ctx.fillText("Current pickup: " + pickupName, canvas.width / 4, 30);
    }
    
    player.pickupDelegate["pickup"] = function(_name) {
        pickupName = _name;
    }
}