Enum.ClassName[Enum.ClassType.Player] = Player;

// BaseClass
function Player(properties) {
    this.health = 100;
    
    GameObject(this, properties);
    this.extends = {
        physics:Physics(this),
        collision:Collision(this),
        tank:Tank(this),
        navigation:AutomaticWalk(this),
        outOfBounds:OutOfBounds(this),
    };
    
    var self = this;
    
    this.physicalAppearanceSize = 30;
    self.ClassType = Enum.ClassType.Player;
    self.mass = 10;
    
    
    var Health = self.health;
    this.__defineGetter__('health', function() {
        return Health;
    })
    this.__defineSetter__('health', function(val) {
        Health = val;
        if (Health <= 0)
            self.destroy();
    })
    
    

    var frontWheelRight = this.addChild(new EmptyObject({
        position: new Vector2.new(7.5, 15),
        size: new Vector2.new(5, 7),
        ID: "frontWheelRight",
    }))

    var frontWheelLeft = this.addChild(new EmptyObject({
        position: new Vector2.new(-7.5, 15),
        size: new Vector2.new(5, 7),
        ID: "frontWheelLeft",
    }))
    
    
    

    this.addChild(new EmptyObject({
        position: new Vector2.new(-7.5, -15),
        size: new Vector2.new(5, 7),
        ID: "BackWheelLeft",
    }))

    this.addChild(new EmptyObject({
        position: new Vector2.new(7.5, -15),
        size: new Vector2.new(5, 7),
        ID: "BackWheelRight",
    }))

    self.cannon = this.addChild(new EmptyObject({
        position: new Vector2.new(0, 0),
        size: new Vector2.new(10, 10),
        ID: "CannonBase",
    }))
    self.cannon.addChild(new EmptyObject({
        position: new Vector2.new(0, 15),
        size: new Vector2.new(5, 20),
        ID: "CannonBarrle",
    }))
    
    
    //Send build player
    //sendObject(self, true);
    
    
    //alert("forward: "+this.forward);
    
    var updateRate = 0;
    //The .update is a update that fires every frame, we use this for AI or playermovement
    this.update["playerUpdate"] = function() {
        
        if (self.creatorID == clientID) {
            if (INPUT["87"]) self.Move(new Vector2.new(0,-3));
            if (INPUT["83"]) self.Move(new Vector2.new(0,3));
            if (INPUT["65"]) self.Move(new Vector2.new(-3,0));
            if (INPUT["68"]) self.Move(new Vector2.new(3,0));

            //if (Vector2.magnitude(self.velocity) > 0.)
            self.rotation = Vector2.toAngle(self.velocity);

            self.cannon.rotation = Vector2.toAngle(self.position, Vector2.subtract(MOUSE.Position, self.stage.position)) - self.rotation;

            //self.stage.position = Vector2.add(Vector2.multiply(self.position,-1), new Vector2.new(canvas.width/2, canvas.height/2));
            
            updateRate++;
            if ((MOUSE_CLICK.mousedown || INPUT_CLICK["32"]) && (updateRate > 5)) {
                updateRate = 0;
                var bullet = new Bullet({
                    position: Vector2.add(self.position, Vector2.multiply(self.cannon.forward, 1)),//self.physicalAppearanceSize/2)),
                    size: new Vector2.new(3, 10),
                    rotation: getObjectRotation(self.cannon),
                    //ignoreObjectIDs: {[self.ID]: true}
                });
                self.ignoreObjectIDs[bullet.ID] = true;
                self.stage.addChild(bullet);
                self.Move(Vector2.multiply(self.cannon.forward, -50));
                sendObject(self, false, true);
                sendObject(bullet, false, true);
            }


            sendObject(self);
            sendObject(self.cannon);
            
        } else self.health--;
    }
}