PlayerStates = {

    AnyState: function (parent) {
        var self = this;
        parent.walkSpeed = 190;

        this.Return = function () {
            return false;
        }

        this.Act = function () {

            if (parent.wallHitDir.x == 1) {
                    parent.walkSpeed = Math.abs(parent.walkSpeed);
                } else if (parent.wallHitDir.x == -1) {
                    parent.walkSpeed = -Math.abs(parent.walkSpeed);
                }

            if (parent.autoWalk) parent.velocity.x = parent.walkSpeed;
        }
        return this;
    },

    Setup: function (parent) {
        if (!parent.extends.collision) parent.extends.collision = Collision(parent);

        parent.wallHitDir = 0;
        parent.onGround = false;
        parent.extraJumpsLeft = 0;
        parent.autoWalk = true;

        parent.collisionEnter["PlayerHitSomething"] = function (Obj, Dir) {
            if(Math.abs(Obj.position.y - parent.position.y) < parent.hitbox.y/2) {
                parent.wallHitDir = Dir;
            }

            if (Dir.y == -1) {
                parent.onGround = true;
            }
        }

        parent.collisionExit["PlayerStopedTouching"] = function (Obj, Dir) {
            if(Math.abs(Obj.position.y - parent.position.y) < parent.hitbox.y/2) {
                parent.wallHitDir = 0;
            }

            if (Dir.y == -1) {
                if (parent.collisionCount <= 1) {
                    parent.onGround = false;
                }
            }
        }
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
    Walk: function (_walkSpeed, _amoundOfExtraJumps, _jumpButton) {
        this.__proto__ = new State();
        var base = this.__proto__;

        var walkSpeed = _walkSpeed || 120;
        var jumpButton = _jumpButton || "32";
        var amoundOfExtraJumps = _amoundOfExtraJumps || 1;

        this.Enter = function (_parent) {
            base.Enter(_parent);
            base.parent.extraJumpsLeft = amoundOfExtraJumps;
            base.parent.autoWalk = true;
        }

        this.Reason = function () {
            if (!base.parent.onGround) {
                base.returnState = StatesEnum.inAir;
                return false;
            } else if (INPUT_CLICK[jumpButton]) {
                base.returnState = StatesEnum.jump;
                return false;
            }
            
            return true;
        }
    },
    //-----End-Walk-----\

    //-----Jump-----\\
    Jump: function (_jumpStrength) {
        this.__proto__ = new State();
        var base = this.__proto__;

        var jumpStrength = _jumpStrength || 600;

        this.Enter = function (_parent) {
            base.Enter(_parent);
            base.parent.velocity.y = -jumpStrength;

            base.parent.returnState = StatesEnum.inAir;
        }
    },
    //-----End-Jump-----\\

    //-----WallJump-----\\

    WallJump: function (_jumpUpStrength, _jumpSideStrength) {
        this.__proto__ = new State();
        var base = this.__proto__;

        var jumpUpStrength = _jumpUpStrength || 800;
        var jumpSideStrength = _jumpSideStrength || 500;

        this.Enter = function (_parent) {
            base.Enter(_parent);

            base.parent.velocity = Vector2.new(
                jumpSideStrength * base.parent.wallHitDir.x,
                -jumpUpStrength
                );

            base.returnState = StatesEnum.inAir;
        }
    },

    //-----End-WallJump-----\\

    //-----inAir-----\\
    InAir: function (_jumpButton) {
        this.__proto__ = new State();
        var base = this.__proto__;

        var jumpButton = _jumpButton || "32";

        this.Enter = function (_parent) {
            base.Enter(_parent);
        }

        this.Reason = function () {

            if (base.parent.onGround) {

                base.returnState = StatesEnum.wander;
                return false;

            } else if (base.parent.wallHitDir) {

                base.returnState = StatesEnum.slide;
                return false;

            } else if (INPUT_CLICK[jumpButton] && base.parent.extraJumpsLeft) {

                base.parent.extraJumpsLeft--;
                base.returnState = StatesEnum.jump;
                return false;

            }
            return true;
        }

    },
    //-----End-inAir-----\\

    //-----Slide-----\\

    Slide: function (_slideSpeed, _wallJumpButton) {
        this.__proto__ = new State();
        var base = this.__proto__;

        var slideSpeed = _slideSpeed || 1.8;
        var wallJumpButton = _wallJumpButton || "32";

        this.Enter = function (_parent) {
            base.Enter(_parent);
            base.parent.autoWalk = false;
        }

        this.Reason = function () {
            if (base.parent.onGround) {
                base.returnState = StatesEnum.wander;
                return false;
            } else if (INPUT_CLICK[wallJumpButton]) {
                base.returnState = StatesEnum.specialJump;
                return false;
            } else if (!base.parent.wallHitDir) {
                return false;
            }
            return true;
        }

        this.Act = function () {
            base.parent.velocity.x = 20 * -base.parent.wallHitDir.x;
            base.parent.velocity.y = base.parent.stage.gravity.y * slideSpeed;
        }

        this.Leave = function () {
            base.parent.autoWalk = true;
            return base.Leave();
        }
    },

    Stagger: function (_staggerUp, _staggerSide) {
        this.__proto__ = new State();
        var base = this.__proto__;

        var staggerUp = _staggerUp || 4;
        var staggerSide = _staggerSide || 2.5;
        
        this.Enter = function (_parent) {
            base.Enter(_parent);

            base.parent.velocity = Vector2.new(staggerSide, staggerUp);
            base.returnState = StatesEnum.inAir;
            base.parent.autoWalk = false;
        }

        this.Leave = function () {
            base.parent.autoWalk = true;
            return base.Leave();
        }
    }


    //-----End-Slide-----\\
        
}