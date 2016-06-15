var PlayerStates = {

    AnyState: function (parent) {
        var self = this;
        parent.walkSpeed = 180;
        parent.doStagger = false;
        parent.staggerAble = true;

        self.Return = function () {
            if (parent.staggerAble && parent.doStagger) {
                parent.returnState = StatesEnum.stun;
                parent.doStagger = false;
                return false;
            }
            return false;
        }

        self.Act = function () {


            if (parent.lastWallHit != parent.wallHitDir) {
                parent.lastWallHit = parent.wallHitDir;

                if (parent.wallHitDir < 0) {
                    parent.walkSpeed = -Math.abs(parent.walkSpeed);
                    parent.scale.x = -Math.abs(parent.scale.x);                    
                } else if (parent.wallHitDir > 0) {
                    parent.walkSpeed = Math.abs(parent.walkSpeed);   
                    parent.scale.x = Math.abs(parent.scale.x);
                } 
            }
            
            if (parent.autoWalk && parent.turnAround) parent.velocity.x = parent.walkSpeed;
        }
        return self;
    },

    Setup: function (parent) {
        //if (!parent.extends.collision) parent.extends.collision = Collision(parent);
        //-----\\
        parent.groundColl = new EmptyObject ({
            size: Vector2.new(20, 5),
            position: Vector2.new(0, parent.hitbox.y/1.5),
            colour: "rgba(112, 112, 112, 0.3)"
        });

        parent.groundColl.extends = {
            collision: Collision(parent.groundColl)
        }
        parent.groundColl.hitbox = parent.groundColl.size;
        parent.groundColl.collisionActive = false;
        //-----\\

        //-----\\
        parent.wallHitColl = new EmptyObject({
            position: Vector2.new(0, -5),
            size: Vector2.new(35, 25),
            colour: "rgba(112, 112, 112, 0.3)"
        });

        parent.wallHitColl.extends = {
            collision: Collision(parent.wallHitColl)
        }
        parent.wallHitColl.hitbox = parent.wallHitColl.size;
        parent.wallHitColl.collisionActive = false;
        parent.wallHitColl.ignoreObjectType[Enum.ClassType.Player] = true;
        parent.wallHitColl.ignoreObjectType[Enum.ClassType.IntermediatePlatform] = true;
        //-----\\

        //-----\\
        parent.onGround = 0;
        parent.wallHitDir = 0;
        parent.lastWallHit = 0;
        parent.wallsHit = 0;

        parent.turnAround = true;
        parent.stopWalking = false;

        parent.amoundOfExtraJumps = 1;
        parent.extraJumpsLeft = 0;

        parent.autoWalk = true;
        //-----\\

        //-----\\
        parent.groundColl.collisionEnter["hitGround"] = function (obj, dir, force, distance, canCollide) {
            if (canCollide) {
                parent.onGround++;
            }
        }

        parent.groundColl.collisionExit["hitGround"] = function (obj, dir, force, distance, canCollide) {
            if (canCollide) {
                parent.onGround--;
            }
        }
        //-----\\

       //-----\\
        parent.wallHitColl.collisionEnter["hitWall"] = function (obj, dir, force, distance, canCollide) {
            if (canCollide) {
                if (dir.x) parent.wallHitDir = dir.x;
                parent.wallsHit ++;
            }
        }

        parent.wallHitColl.collisionExit["hitWall"] = function (obj, dir, force, distance, canCollide) {
            if (canCollide) {
                parent.wallsHit --;
            }
        }

        parent.addChild(parent.groundColl);
        parent.addChild(parent.wallHitColl);
        //-----\\

    },



    //----------------------------\\
    /*
    --REFERENCE  STATE INTERFACE-- 
    this.State = {
        parent: undefined,
        returnState: parent.defaultStateKey,
        isState: true,

        Enter: function (_parent) { parent = _parent },
        Reason: function () { return false; },
        Act: function () { },
        Leave: function () { return returnState; }
    }
    */
    //----------------------------\\

    //-----Walk-----\\
    Walk: function (_parent, _walkSpeed, _amoundOfExtraJumps, _jumpButton) {
        CreateState(this);
        var self = this;

        var parent = _parent;

        var walkSpeed = _walkSpeed || 120;
        var jumpButton = _jumpButton || "32";
        
        var animObj = parent.DrawObject.animations.backOnGround;
        var animLength = animObj.keyFrames.length-1;

        self.Enter = function () {

            parent.amoundOfExtraJumps = _amoundOfExtraJumps || 1;
            parent.extraJumpsLeft = parent.amoundOfExtraJumps;
            parent.autoWalk = true;

            parent.DrawObject.currentAnimation = "backOnGround";
            animObj.currentKeyFrame = 0;
        }

        self.Reason = function () {
            if (Math.floor(animObj.currentKeyFrame) == animLength) 
                parent.DrawObject.currentAnimation = "walk";

            if (parent.onGround === 0) {
                self.returnState = StatesEnum.inAir;
                return false;
            } else if (INPUT_CLICK[jumpButton]) {
                self.returnState = StatesEnum.jump;
                return false;
            }
            
            return true;
        }
    },
    //-----End-Walk-----\

    //-----Jump-----\\
    Jump: function (_parent,_jumpStrength) {
        CreateState(this);
        var self = this;

        var parent = _parent;

        var jumpStrength = _jumpStrength || 500;
        
        var animObj = parent.DrawObject.animations.jumpStart;

        self.Enter = function () {
            parent.DrawObject.currentAnimation = "jumpStart";
            animObj.currentKeyFrame = 0;

            parent.autoWalk = true;
            parent.velocity = Vector2.new(parent.walkSpeed, -jumpStrength);

            parent.returnState = StatesEnum.inAir;
        }

    },

    //-----End-Jump-----\\
    ExtraJump: function (_parent, _extraJumpStrength) {
        CreateState(this);
        var self = this;
        
        var parent = _parent;

        var extraJumpsStrength = _extraJumpStrength || 600;

        var animObj = parent.DrawObject.animations.doubleJump;

        self.Enter = function () {

            parent.DrawObject.currentAnimation = "doubleJump";
            animObj.currentKeyFrame = 0;
            
            parent.autoWalk = true;
            parent.velocity = Vector2.new(parent.walkSpeed, -extraJumpsStrength);

            parent.returnState = StatesEnum.inAir;
        }

    } ,

    //-----WallJump-----\\

    WallJump: function (_parent,_jumpUpStrength, _jumpSideStrength) {
        CreateState(this);
        var self = this;
        var parent = _parent;

        var jumpUpStrength = _jumpUpStrength || 400;
        var jumpSideStrength = _jumpSideStrength || 300;

        var animObj = parent.DrawObject.animations.jumpStart;

        self.Enter = function () {
            parent.DrawObject.currentAnimation = "jumpStart";   
            animObj.currentKeyFrame = 0;

            parent.autoWalk = true;
            
            parent.velocity = Vector2.new(
                jumpSideStrength * Math.sign(parent.wallHitDir),
                -jumpUpStrength
                );
            self.returnState = StatesEnum.inAir;
        }           
    },

    //-----End-WallJump-----\\

    //-----inAir-----\\
    InAir: function (_parent,_jumpButton) {
        CreateState(this);
        var self = this;
        var parent = _parent;

        var jumpButton = _jumpButton || "32";

        var drawObject = parent.DrawObject;
        var currAnimObj = undefined;
        var animLength = 0;

        self.Enter = function () {
            //parent.DrawObject.currentAnimation = "inAir";
            currAnimObj = drawObject.animations[drawObject.currentAnimation];
            animLength = currAnimObj.keyFrames.length-1;
            parent.autoWalk = false;
        }

        self.Reason = function () {

            if (Math.floor(currAnimObj.currentKeyFrame) == animLength) 
                drawObject.currentAnimation = 'inAir';

            if (parent.onGround > 0) {

                self.returnState = StatesEnum.wander;
                return false;

            } else if (parent.wallsHit > 0 && parent.velocity.y > 0) {
                parent.stopWalking = true;
                self.returnState = StatesEnum.slide;
                return false;

            } else if (INPUT_CLICK[jumpButton] && parent.extraJumpsLeft) {

                parent.extraJumpsLeft--;
                self.returnState = StatesEnum.extraJump;
                return false;

            }
            return true;
        }

        self.Leave = function () {
            //parent.stopWalking = false;
            parent.autoWalk = true;
            return self.returnState;
        }

    },
    //-----End-inAir-----\\

    //-----Slide-----\\

    Slide: function (_parent,_slideSpeed, _wallJumpButton) {
        CreateState(this);
        var self = this;
        var parent = _parent;

        var slideSpeed = _slideSpeed || 3;
        var wallJumpButton = _wallJumpButton || "32";

        self.Enter = function () {
            parent.autoWalk = false;
            parent.extraJumpsLeft = parent.amoundOfExtraJumps;                  

            parent.DrawObject.currentAnimation = "slide";    

        }

        self.Reason = function () {
            if (parent.onGround) {
                self.returnState = StatesEnum.wander;
                return false;
            } else if (INPUT_CLICK[wallJumpButton]) {
                self.returnState = StatesEnum.specialJump;
                return false;
            } else if (parent.wallsHit <= 0) {
                parent.autoWalk = false;
                self.returnState = StatesEnum.inAir;
                return false;
            }
            return true;
        }

        self.Act = function () {
            parent.velocity = Vector2.new(80 * -parent.wallHitDir,
            parent.stage.gravity.y * slideSpeed);
        }

        self.Leave = function () {
            parent.stopWalking = false;
            return self.returnState;
        }
    },

    Stagger: function (_parent,_staggerUp, _staggerSide) {
        CreateState(this);
        var self = this;
        var parent = _parent;

        var staggerUp = _staggerUp || 4;
        var staggerSide = _staggerSide || 2.5;
        
        self.Enter = function () {

            if(_parent.staggerAble) {
                parent.velocity = Vector2.new(staggerSide, staggerUp);
                self.returnState = StatesEnum.inAir;
                parent.autoWalk = false;
                parent.DrawObject.animation = "stagger";
            }
        }

        self.Leave = function () {
            parent.autoWalk = true;
            return self.returnState;
        }
    }


    //-----End-Slide-----\\
        
}