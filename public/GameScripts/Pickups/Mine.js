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
                position: Vector2.new(0, 817),
                size: Vector2.new(400, 361),
                columns: 8,
                rows: 12,
            },
            mineIdle: {
                position: Vector2.new(0, 0),
                size: Vector2.new(400, 817),
                columns: 5,
                rows: 12,
            },
        },
        {   //Animations
            mineActivate: {
                sprite: "mineActivate",
                speed: .3, //Per frame
                keyFrames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,38,39,40,41,42,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64.65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
            mineIdle: {
                sprite: "mineIdle",
                speed: .3, //Per frame
                keyFrames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,38,39,40,41,42,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );
    
    this.update["WaitForAnimationEndMine"] = function() {
        if(self.animations.mineActivate.currentKeyFrame == 95) {
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