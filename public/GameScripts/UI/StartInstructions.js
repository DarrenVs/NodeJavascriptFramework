var StartInstructions = function() {
    GameObject(this);
    var self = this;
    
    self.size = new Vector2.new(10000,10000);
    
    delete self.DrawObject;
    
    this.update["DrawUI"] = function() {
        ctx.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
        ctx.font = 'italic 30pt Calibri';
        ctx.fillStyle = "#000";
		ctx.fillText("Lives: ", 1000, 1000);
    }
}