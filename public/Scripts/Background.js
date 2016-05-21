// BaseClass
function Background(properties) {
    GameObject(this, properties);
    var self = this;
    
    var background = new Image()
    background.src = "Images/Grid.png"
    
    
    this.DrawObject.update = function() {
        
        transformObject(self);
        ctx.drawImage(background, 0, 0);
    }
}