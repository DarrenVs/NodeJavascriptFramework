var PickupUI = function() {
    GameObject(this);
    var self = this;
    
    self.color = "red";
    
    var pickupName = "None";
    
    var player = PlayerProperties.findClientPlayer();
    
    ctx.font = "17pt Arial";
    
    ctx.textAlign = "center";
    
    self.zIndex = 10000;
    
    self.DrawObject = new function() { 
        this.update = function() {
            transformObject(self);
            ctx.fillStyle = "white";
            
            ctx.fillText("Current pickup: " + pickupName, canvas.width / 4, 30);
        }
    }
    
    player.pickupDelegate["pickup"] = function(_name) {
        pickupName = _name;
    }
}