var StartInstructions = function() {
    GameObject(this);
    var self = this;
    
    this.extends = {
        collision:Collision(this),
    };
    
    ctx.font = "17pt Arial";
    
    ctx.textAlign = "center";
    
    self.zIndex = 10000;
    
    self.DrawObject = new function() { 
        this.update = function() {
            transformObject(self);
            ctx.fillStyle = "white";
            
            ctx.fillText("Press SPACE to jump", canvas.width/ 2, canvas.height / 8);
            ctx.fillText("Press R to ready up and activating a pickup", canvas.width/ 2, canvas.height / 8 + 30);
            ctx.fillText("The game will start when all players are ready!", canvas.width/ 2, canvas.height / 8 + 90);
        }
    }

    self.deactivate = function() {
        delete self.update["InstructionsUIUpdate"];
    }
}