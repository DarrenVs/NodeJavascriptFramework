Enum.ClassName[Enum.ClassType.Player] = Player;

var playerList = {};

// BaseClass
function Player(properties) {
    this.health = 100;
    //console.log(PlayerStates);
    
    GameObject(this, properties);
    var self = this;
    
    this.extends = {
        physics:Physics(this),
        collision:Collision(this),
        tank:Tank(this),
        navigation:new StateMachine(self, StatesEnum.inAir, 
            PlayerStates.Setup(self), 
            PlayerStates.AnyState(self), 
            false),
    };
    
    //-----Adding the states!!!-----\\
    var sm = this.extends.navigation;
    sm.AddState(StatesEnum.wander, new PlayerStates.Walk());
    sm.AddState(StatesEnum.jump, new PlayerStates.Jump());
    sm.AddState(StatesEnum.specialJump, new PlayerStates.WallJump());
    sm.AddState(StatesEnum.slide, new PlayerStates.Slide());
    sm.AddState(StatesEnum.stun, new PlayerStates.Stagger());
    sm.AddState(StatesEnum.inAir, new PlayerStates.InAir());

    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.PlayerRunSpriteSheet,   //Image
        
        {   //Sprites
            
            playerMovement: {
                position: Vector2.new(0, 0),
                size: Vector2.new(589, 201),
                columns: 7,
                rows: 2,
            },
            jump: {
                position: Vector2.new(0, 0),
                size: Vector2.new(393, 100),
                columns: 7,
                rows: 1,
            }
        },
        
        {   //Animations
            run: {
                sprite: "playerMovement",
                speed: .2, //Per frame
                keyFrames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
            jump: {
                sprite: "jump",
                speed: .15, //Per frame
                keyFrames: [0,1,2,3,4,5,6], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );
    
    playerList[self.creatorID] = self;
    
    this.DrawObject.currentAnimation = "run";
    
    this.anchored = false;
    
    this.size = Vector2.new(60, 60);
    
    this.colliderType = Enum.colliderType.box;
    
    this.hitbox = Vector2.new(self.size.x * 0.5, self.size.y);
    
    self.ClassType = Enum.ClassType.Player;
    self.mass = 10;
    
    
    var Health = self.health;
    this.__defineGetter__('health', function() {
        return Health;
    })
    this.__defineSetter__('health', function(val) {
        Health = val;
        if (Health <= 0)
            self.Die();
    })
    
    var grounded = true;
    
    var canDoubleJump = false;
    
    var wallJumpDirection = 0;
    
    this.collisionStay["PlayerCollision"] = function(Obj, Dir) {
        
        //if we are standing on the ground 
        if(Math.round(Dir.y) == -1) {
            
            wallJumpDirection = 0;
            grounded = true;
            self.autoWalk = true;
            canDoubleJump = true;
            
        } else if(Math.round(Dir.x) != 0) {//else if the collision comes from left or right (wall jumping)
            
            wallJumpDirection = Dir.x;
            grounded = false;
            self.autoWalk = false;
            currentGravity = slidingGravtiy;
            canDoubleJump = true;
            
        }
    }
    
    //the speeds for different kind of jumps
    var jumpSpeed = 400;
    
    var doubleJumpSpeed = 300;
    
    //the direction and speed we walljump
    var wallJumpSpeed = 400;
    
    var fallingGravity = 9.3;
    
    var slidingGravtiy = 9.3;
    
    var updateRate = 0;
    //The .update is a update that fires every frame, we use this for AI or playermovement
    this.update["playerUpdate"] = function() {
        if (self.creatorID == clientID) {
            /*
            //jumping
            if (INPUT_CLICK["32"]) {
                
                if(grounded) { //normal jump
                    
                    self.velocity.y -= jumpSpeed;
                    
                } else if(wallJumpDirection != 0) { //wall jump
                    
                    self.velocity.y -= wallJumpSpeed;
                    self.autoWalk = true;
                    wallJumpDirection = 0;
                    
                } else if(canDoubleJump) { //double jump
                    
                    self.velocity.y -= doubleJumpSpeed;
                    canDoubleJump = false;
                    
                }
            }
            
            grounded = false;
            
            if(wallJumpDirection != 0) {
                self.velocity.y += slidingGravtiy;
            }
            else {
                self.velocity.y += fallingGravity;
            }
            
            updateRate++;
    
            sendObject(self, false, true);
            */

        } else {
            self.health--;
        }
    }
    
    this.Die = function() {
        console.log("player dies");
        
        delete playerList[self.creatorID];
        self.Health = 0;
        sendObject(self);
        self.destroy();
    }
}