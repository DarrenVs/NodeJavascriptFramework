Enum.ClassName[Enum.ClassType.Mine] = Mine;

// BaseClass
function Mine(properties) {
    var self = this;
    GameObject(this, properties);
    
    this.extends = {
        collision:Collision(this),
        physics:Physics(this),
    };

    self.ClassType = Enum.ClassType.Mine;
    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.MineEffectSpriteSheet,   //Image
        {   //Sprites
            mineIdle: {
                position: Vector2.new(0, 0),
                size: Vector2.new(427, 681),
                columns: 6,
                rows: 10,
            },
        },
        {   //Animations
            mineIdle: {
                sprite: "mineIdle",
                speed: .3, //Per frame
                keyFrames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,38,39,40,41,42,44,45,46,47,48,49,50,51,52,53,54,55], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );
    
    self.DrawObject.spriteOffset = new Vector2.new(0, 11);
    
    self.update["mineSendObject"] = function() {
        if(self.creatorID == clientID) {
            sendObject(self, false, true);
        }
    }
    
    this.collisionEnter["mineCollision"] = function(Obj, direction, force, distance, canCollide) {
        if(canCollide && Obj.ClassType == Enum.ClassType.Player) {
            console.log("doStagger");
            Obj.doStagger = true;
            self.destroy();
        }
    };
}