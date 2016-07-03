var StartInstructions = function() {
    GameObject(this);
    var self = this;
    
    this.extends = {
        collision:Collision(this),
    };
    
    self.color = "red";
    
    ctx.font = "17pt Arial";
    
    ctx.textAlign = "center";
    
    self.update["InstructionsUIUpdate"] = function() {
        ctx.fillText("Press SPACE to jump", canvas.width/ 2, canvas.height / 8);
        ctx.fillText("Press R to ready up and activating a pickup", canvas.width/ 2, canvas.height / 8 + 30);
        ctx.fillText("The game will start when all players are ready!", canvas.width/ 2, canvas.height / 8 + 90);
    }

    self.deactivate = function() {
        delete self.update["InstructionsUIUpdate"];
    }
}