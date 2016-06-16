"use strict";

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

var EnemyStates = {
    AnyState: function (parent) {
        this.Act = function () {
            if (parent.oldWallHitDir != parent.wallHitDir) {
                parent.oldWallHitDir = parent.wallHitDir;
                console.log("changing direction in " + parent.ClassType);

                parent.walkSpeed = parent.wallHitDir * Math.abs(parent.walkSpeed);
            }
        };
        this.Return = function(){
            return false;
        };
        return this;
    },

    Setup: function (parent) {

        parent.wallHitDir = -1;
        parent.oldWallHitDir = 54;
        parent.walkSpeed = -.5;

/*
        parent.collisionEnter["hitWall"] = function (Obj, dir, force, distance, canCollide) {
            console.log(dir);
            if (Obj.x) parent.wallHitDir = dir.x;
            //console.log("change direction " ,  parent.wallHitDir, parent.oldWallHitDir);
        };
        */

    },

    NormalWander: function (_parent,_walkSpeed) {
        CreateState(this);
        var parent = _parent;

        var self = this;
        
        var enemies = [];
        var walkSpeed = _walkSpeed || 1;

        this.Enter = function () {
            _parent.colour = "blue";
            parent.walkSpeed = walkSpeed;
        }
        
        this.Reason = function () {
            if (parent.triggered) {
                self.returnState = StatesEnum.alert;
                return false;
            }
                     
            return true;
        }
        
            this.Act = function () {
                
                parent.position.x += parent.walkSpeed;
            } 
        
            
        this.Leave = function() {
            return self.returnState;
        }
    },
    
    AngryWander: function (_parent,_walkSpeed) {
        CreateState(this);
        var parent = _parent;

        var self = this;
        
        var enemies = [];
        this.Enter = function () {
            _parent.colour = "red";
            
        }
        
        this.Reason = function () {
            if (parent.triggered) {
                self.returnState = StatesEnum.alert;
                return false;
            }
                
           
            return true;
        }
        
            this.Act = function () {

                parent.position.x += self.walkSpeed;
            } 
        
            
        this.Leave = function() {
            return self.returnState;
        }
    },

    //__alert__
    Enrage: function (_parent,_responseTime, _rageIntencity) {
        CreateState(this);
        var parent = _parent;

        var self = this;
        
        var responseTime = _responseTime || 20;
        var rageIntencity = _rageIntencity;
         
        var timeLeft = responseTime;   
                
        this.Enter = function () {
            _parent.colour = "red";
            _parent.velocity = Vector2.new();
            timeLeft = responseTime;            
        }
        
        this.Reason = function () {
            if (timeLeft < 0) {
                self.returnState = StatesEnum.charge;
                return false;
            }
                       
             return true;       
        }
        
        this.Act = function () {
                parent.position = Vector2.new(
                    parent.position.x + Math.random() * rageIntencity - rageIntencity/2,
                    parent.position.y + Math.random() * rageIntencity - rageIntencity/2);
                    
            timeLeft -= 1;
        }
        
        this.Leave = function() {
            return self.returnState
        }
    },
    
    //____Idle____
    ChargeGun: function (_parent,_attackRange, _chargeSpeed, _chargeCoolDown) {
        CreateState(this);
        var parent = _parent;

        var self = this;
        
        var attackRange = _attackRange || 20;
        var chargeSpeed = _chargeSpeed || 5;
        var chargeCooldown = _chargeCoolDown || 5;
        var resetCharge = undefined;
        var STOP = false;
        
        this.Enter = function () {
            parent.colour = "red";
        }
        
        this.Reason = function () {
            console.log(parent.target.position);
            var magnitude = Vector2.magnitude(this.parent.position, parent.target.position);
            
            if (STOP) {
                self.returnState = StatesEnum.specialWander;
                return false;
            }
            
            if (!parent.triggered) {  
                if (typeof(resetCharge) != 'undefined') {
                    setTimeout(cancleCharge, chargeCooldown);
                }
            } else if (typeof(resetCharge) == 'number') {
                clearInterval(resetCharge);
            }
            
            if (magnitude < attackRange) {
                self.returnState = StatesEnum.interact;
                return false;
            }
            
            return true;
        }
        
        this.Act = function () {
            
            parent.position = Vector2.subtract(
                parent.position,
                Vector2.multiply(
                    Vector2.unit (Vector2.subtract(parent.position, parent.target.position)), 
                chargeSpeed)
            );
            
        }
        
        this.Leave = function() {
            STOP = false;
            resetCharge = undefined;
            return self.returnState;
        }
        
        this.cancleCharge = function () {
            STOP = true;
            parent.target = undefined;
        }
    },

    Charge: function (_parent,_attackRange, _chargeSpeed, _chargeCoolDown) {
        CreateState(this);
        var parent = _parent;

        var self = this;
        
        var attackRange = _attackRange || 200;
        var chargeSpeed = _chargeSpeed || 5;
        var chargeCooldown = _chargeCoolDown || 5;
        var resetCharge = undefined;
        var STOP = false;
        
        this.Enter = function () {
            parent.colour = "red";
        }
        
        this.Reason = function () {
            var magnitude = Vector2.magnitude(this.parent.position, parent.target.position);
            console.log(magnitude, attackRange);
            if (STOP) {
                self.returnState = StatesEnum.specialWander;
                return false;
            }
            
            if (!parent.triggered) {  
                if (typeof(resetCharge) != 'undefined') {
                    setTimeout(cancleCharge, chargeCooldown);
                }
            } else if (typeof(resetCharge) == 'number') {
                clearInterval(resetCharge);
            }
            
            if (magnitude < attackRange) {
                self.returnState = StatesEnum.interact;
                return false;
            }
            
            return true;
        }
        
        this.Act = function () {
            
            parent.position = Vector2.subtract(
                parent.position,
                Vector2.multiply(
                    Vector2.unit (Vector2.subtract(parent.position, parent.target.position)), 
                chargeSpeed)
            );
            
        }
        
        this.Leave = function() {
            STOP = false;
            resetCharge = undefined;

            return self.returnState
        }
        
        this.cancleCharge = function () {
            STOP = true;
            parent.target = undefined;
        }
    },
    
    Shoot: function (_parent) {
        CreateState(this);
        var parent = _parent;

        var self = this;

        var deltDamage = false;
        
        this.Enter = function () {
            _parent.colour = "black";
            deltDamage = false;
        }
        
        this.Reason = function () {
            if (deltDamage) {    
                //!if hit 
                self.returnState = StatesEnum.charge;
                //else
                self.returnState = StatesEnum.AngryWander; 
                                    
                return false;
            } return true;
        }
        
        this.Act = function (_parent) {
            var bullet = new Bullet({
                    position: Vector2.add(parent.position, Vector2.multiply(parent.forward, 1)),
                    size: new Vector2.new(3, 10),
                    rotation: Vector2.toAngle(Vector2.unit (Vector2.subtract(parent.position, parent.target.position))), 
                });
                parent.ignoreObjectIDs[bullet.ID] = true;
                parent.stage.addChild(bullet);
            deltDamage = true;
        }
        
        this.Leave = function() {
            return self.returnState;
        }
        
        this.cancleCharge = function () {
            STOP = true;
            parent.target = undefined;
        }
    },

    //__attack__
    Attack: function (_parent) {
        CreateState(this);
        var parent = _parent;

        var self = this;
        var deltDamage = false;
        
        this.Enter = function () {
            _parent.colour = "black";
            deltDamage = false;
        }
        
        this.Reason = function () {
            if (deltDamage) {                        
                return false;
            } return true;
        }
        
        this.Act = function () {
            console.log("YOU GOT HIT BY A SPOOK (get rekt)");
            deltDamage = true;
        }
    },
}


/*
this.EnemyAI = function () {
    var machine = new StateMachine(this, StatesEnum.wander);
    
    machine.AddState(StatesEnum.wander, new Wander());
    machine.AddState(StatesEnum.interact, new Attack());
    machine.AddState(StatesEnum.alert, new FocusOnEnemy());
    machine.AddState(StatesEnum.retreat, new Block());
    machine.AddState(StatesEnum.idle, new Idle());
    
    this.update['EnemyUpdate'] = function () {
        machine.UpdateMachine();
    }
}
*/