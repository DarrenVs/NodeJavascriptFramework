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
        AI:StateMachine(this, StatesEnum.wander),
    };
    
    var self = this;
    
    /*
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.PlayerJumpSpriteSheet,   //Image
        4,  //Columns
        2,  //Rows
        {   //Animations
            walk: {
                speed: .05, //Per frame
                keyFrames: [0,1,2,3,4,5], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );*/
    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.PlayerRunSpriteSheet,   //Image
        7,  //Columns
        2,  //Rows
        {   //Animations
            walk: {
                speed: .3, //Per frame
                keyFrames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );
    
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
            self.destroy();
    })
    
    var grounded = true;
    
    var canDoubleJump = false;
    
    var wallJumpDirection = 0;
    
    var collisions = {};
    
    this.collisionEvents["PlayerCollision"] = function(Obj, Dir) {
        if (Obj.ClassType == Enum.ClassType.IntermediatePlatform && Obj.position.y < self.position.y) {
            self.position.y -= 40; 
        }
        
        //if the collision comes from left or right (wall jumping)
        if(Dir.x != 0) {
            
            wallJumpDirection = Dir.x;
            grounded = false;
            autoWalk = false;
            currentGravity = slidingGravtiy;
            canDoubleJump = true;
            
        } else if(Dir.y != 1) {
            
            wallJumpDirection = 0;
            grounded = true;
            autoWalk = true;
            canDoubleJump = true;
        }
        
        collisions[Obj.ID] = true;
    }
    
    //the speeds for different kind of jumps
    var jumpSpeed = 400;
    
    var doubleJumpSpeed = 300;
    
    //the direction and speed we walljump
    var wallJumpSpeed = 400;
    
    var fallingGravity = 9.3;
    
    var slidingGravtiy = 4;
    
    var updateRate = 0;
    //The .update is a update that fires every frame, we use this for AI or playermovement
    this.update["playerUpdate"] = function() {
        if (self.creatorID == clientID) {
            
            //jumping
            if (INPUT_CLICK["32"]) {
                if(grounded) { //normal jump
                    
                    self.velocity.y -= jumpSpeed;
                    
                } else if(wallJumpDirection != 0) { //walk jump
                    
                    self.velocity.y -= wallJumpSpeed;
                    autoWalk = true;
                    wallJumpDirection = 0;
                    
                } else if(canDoubleJump) { //double jump
                    
                    self.velocity.y -= doubleJumpSpeed;
                    canDoubleJump = false;
                }
            }
            
            grounded = false;
            
            if(wallJumpDirection != 0)
                self.velocity.y += slidingGravtiy;
            else
                self.velocity.y += fallingGravity;
            
            
            
            collisions = {};
            
            //wallJumpDirection = 0;
            
            updateRate++;  
        } else {
            self.health--;
        }
    }
}