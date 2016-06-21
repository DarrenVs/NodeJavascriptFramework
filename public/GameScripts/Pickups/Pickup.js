Enum.ClassName[Enum.ClassType.Pickup] = Pickup;

// BaseClass
function Pickup(properties) {
    var self = this;
    GameObject(this, properties);
    
    this.extends = {
        collision:Collision(this),
    }
    
    self.pickupChoices = {
        0: StatesEnum.invulnerabilityOnHold,
        1: StatesEnum.mineOnHold,
        2: StatesEnum.ballOnHold,
        3: StatesEnum.throwAbleOnHold,
    };
    
    self.collisionActive = false;
    self.canCollide = false;
    self.ClassType = Enum.ClassType.Pickup;
    
    self.size = new Vector2.new(60, 60);
    
    this.collisionEnter["destroyPickupOnCollision"] = function(Obj) {
        if(Obj.ClassType == Enum.ClassType.Player) {
            self.destroy();
        }
    }
    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.Pickup,   //Image
        {   //Sprites
            pickupAnimation: {
                position: Vector2.new(0, 0),
                size: Vector2.new(1465, 1833),
                columns: 8,
                rows: 8,
            },
        },
        {   //Animations
            pickupAnimation: {
                sprite: "pickupAnimation",
                speed: .3, //Per frame
                keyFrames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,38,39,40,41,42,44,45,46,47,48,49,50,51,52,53,54,55,56,57], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );
}