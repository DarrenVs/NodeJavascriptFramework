Enum.ClassName[Enum.ClassType.Mine] = Mine;

// BaseClass
function Mine(properties) {
    var self = this;
    GameObject(this, properties);
    
    this.extends = {
        collision:Collision(this),
    };
    
    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.MineEffectSpriteSheet,   //Image
        {   //Sprites
            mineActivate: {
                position: Vector2.new(0, 0),
                size: Vector2.new(2080, 790),
                columns: 7,
                rows: 3,
            },
            mineIdle: {
                position: Vector2.new(0, 0),
                size: Vector2.new(2080, 790),
                columns: 7,
                rows: 3,
            },
        },
        {   //Animations
            mineActivate: {
                sprite: "mineActivate",
                speed: .3, //Per frame
                keyFrames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
            mineIdle: {
                sprite: "mineIdle",
                speed: .3, //Per frame
                keyFrames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );
    
    this.update["WaitForAnimationEndMine"] = function() {
        if(self.animations.mineActivate.currentKeyFrame == 19) {
            self.DrawObject.currentAnimation = "mineIdle";
            delete self.update["WaitForAnimationEnd"];
        }
    }
    
    this.collisionEnter["mineCollision"] = function(Obj) {
        if(Obj.ClassType == Enum.ClassType.Player) {
            Obj.doStagger = true;
        }
    };
}