Enum.ClassName[Enum.ClassType.Player] = Player;

// BaseClass
function Player(properties) {
    this.health = 100;
    
    GameObject(this, properties);
    this.extends = {
        physics:Physics(this),
        collision:Collision(this),
        tank:Tank(this),
    };
    
    var self = this;
    
    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.SampleSprite1,   //Image
        
        {   //Sprites
            playerMovement: {
                position: Vector2.new(0, 0),
                size: Vector2.new(20, 20),
                columns: 2,
                rows: 2,
            },
            jump: {
                position: Vector2.new(0, 20),
                size: Vector2.new(40, 40),
                columns: 2,
                rows: 2,
            }
        },
        
        {   //Animations
            walk: {
                sprite: "playerMovement",
                speed: .05, //Per frame
                keyFrames: [0,1,2,3], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
            jump: {
                sprite: "jump",
                speed: .05, //Per frame
                keyFrames: [0,1,2,3], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );
    
    
    this.colliderType = Enum.colliderType.circle;
    this.hitbox = Vector2.new(30, 30);
    self.ClassType = Enum.ClassType.Player;
    self.mass = 30;
    
    
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
            
            if (INPUT_CLICK["32"])
                self.DrawObject.currentAnimation = self.DrawObject.currentAnimation == "jump" ? "walk" : "jump";

            //if (Vector2.magnitude(self.velocity) > 0.)
            //self.rotation = Vector2.toAngle(self.velocity);

            self.cannon.rotation = Vector2.toAngle(self.globalPosition, self.stage.mousePosition) - self.rotation;

            self.stage.position = Vector2.add(Vector2.multiply(self.globalPosition,-1), new Vector2.new(canvas.width/2, canvas.height/2));
            
            updateRate++;
            if ((MOUSE_CLICK.mousedown || INPUT_CLICK["32"]) && (updateRate > 5)) {
                updateRate = 0;
                var bullet = new Bullet({
                    position: Vector2.add(self.globalPosition, Vector2.multiply(self.cannon.forward, 5)),
                    size: new Vector2.new(3, 10),
                    rotation: getObjectRotation(self.cannon),
                    //ignoreObjectIDs: {[self.ID]: true}
                });
                self.ignoreObjectIDs[bullet.ID] = true;
                self.stage.addChild(bullet);
                self.Move(Vector2.multiply(self.cannon.forward, -25));
                sendObject(self, false, true);
                sendObject(bullet, false, true);
            }


            sendObject(self);
            sendObject(self.cannon);
            
        } else self.health -= Math.max(25, self.health/2) * RENDERSETTINGS.deltaTime;
    }
}