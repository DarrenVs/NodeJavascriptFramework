Enum.ClassName[Enum.ClassType.UI] = UI;

// BaseClass
function UI(properties) {
    var self = this;
    GameObject(this, properties);
 
    var globalPosition
    
    this.update["DrawUI"] = function() {
        globalPosition = self.stage.getGlobalPos(self.position);
        
        
        ctx.setTransform(1, 0, 0, 1, globalPosition, globalPosition);
        ctx.font = 'italic 30pt Calibri';
        ctx.fillStyle = "#000";
		ctx.fillRect(-self.size.x/2, -self.size.y/2 + 10, player.hJumpTimer, self.size.y);
		ctx.fillText("Lives: " + UIlives + "  Weapon: " + UIweaponName + "  Ammo: " + UIammo + "  Kills: " + UIkills, -self.size.x / 2, -self.size.y/2);
        ctx.fillText("FPS: " + FPS, canvasWidth - 160, -self.size.y/2);
    }
    
    
    var self = this;
    
	this.update.push(function(){
		ctx.setTransform(1, 0, 0, 1, self.cFrame.position.x, self.cFrame.position.y);
        ctx.font = 'italic 30pt Calibri';
        ctx.fillStyle = "#000";
		ctx.fillRect(-self.size.x/2, -self.size.y/2 + 10, player.hJumpTimer, self.size.y);
		ctx.fillText("Lives: " + UIlives + "  Weapon: " + UIweaponName + "  Ammo: " + UIammo + "  Kills: " + UIkills, -self.size.x / 2, -self.size.y/2);
        ctx.fillText("FPS: " + FPS, canvasWidth - 160, -self.size.y/2);
        
        
        if(!gameRunning) PauzeScreen();
	})
}