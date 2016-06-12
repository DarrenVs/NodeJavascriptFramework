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

EnemyStates = {
    Setup: function (parent) {

        parent.wallHitDir = 0;

        parent.collisionEnter["turnAround"] = function (obj, dir, force, distance, canCollide, collisionFrames) {
            if (canCollide) {
                if(collisionFrames >= 3 && Math.round(Dir.x) != 0) {
                    //console.log("chaning dir");
                    parent.wallHitDir = Dir;
                    parent.wall[Obj.ID] = true;
                }
            }
        }

        parent.collisionExit["turnAround"] = function (obj, dir, force, distance, canCollide, collisionFrames) {
            if (canCollide) {
                if (parent.wall[Obj.ID] != undefined)
                    delete parent.wall[Obj.ID];
                
                if (Object.keys(parent.wall).length == 0)
                    parent.wallHitDir = 0;
            }
        }
    },

    NormalWander: function (_walkSpeed) {
        this.__proto__ = new State();
        var base = this.__proto__;
        
        var enemies = [];
        var walkSpeed = 1;

        this.Enter = function (_parent) {
            base.Enter(_parent);
            _parent.colour = "blue";
                        
        }
        
        this.Reason = function () {
            if (base.parent.triggered) {
                base.returnState = StatesEnum.alert;
                return false;
            }
                     
            return true;
        }
        
            this.Act = function () {

                if (base.parent.wallHitDir) {
                    walkSpeed = base.parent.wallHitDir * _walkSpeed;
                } 

                base.parent.position.x += walkSpeed;
            } 
        
            
        this.Leave = function() {
            return base.Leave();
        }
    },
    
    AngryWander: function (_walkSpeed) {
        this.__proto__ = new State();
        var base = this.__proto__;
        
        var enemies = [];
        this.Enter = function (_parent) {
            base.Enter(_parent);
            _parent.colour = "red";
            
            _parent.extends["Navigation"] = AutomaticWalk(_parent, _walkSpeed);
        }
        
        this.Reason = function () {
            if (base.parent.triggered) {
                base.returnState = StatesEnum.alert;
                return false;
            }
                
           
            return true;
        }
        
            this.Act = function () {
                base.Act();
            } 
        
            
        this.Leave = function() {
            delete base.parent.update["NavigationUpdate"];  
            return base.Leave();
        }
    },

    //__alert__
    Enrage: function (_responseTime, _rageIntencity) {
        this.__proto__ = new State();
        var base = this.__proto__;
        
        var responseTime = _responseTime || 20;
        var rageIntencity = _rageIntencity;
         
        var timeLeft = responseTime;   
                
        this.Enter = function (_parent) {
            base.Enter(_parent);
            _parent.colour = "red";
            _parent.velocity = Vector2.new();
            timeLeft = responseTime;            
        }
        
        this.Reason = function () {
            if (timeLeft < 0) {
                base.returnState = StatesEnum.charge;
                return false;
            }
                       
             return true;       
        }
        
        this.Act = function () {
                base.parent.position = Vector2.new(
                    base.parent.position.x + Math.random() * rageIntencity - rageIntencity/2,
                    base.parent.position.y + Math.random() * rageIntencity - rageIntencity/2);
                    
            timeLeft -= 1;
            //console.log(timeLeft);
        }
        
        this.Leave = function() {
            return base.Leave();
        }
    },
    
    //____Idle____
    ChargeGun: function (_attackRange, _chargeSpeed, _chargeCoolDown) {
        this.__proto__ = new State();
        var base = this.__proto__;
        
        var attackRange = _attackRange || 20;
        var chargeSpeed = _chargeSpeed || 5;
        var chargeCooldown = _chargeCoolDown || 5;
        var resetCharge = undefined;
        var STOP = false;
        
        this.Enter = function (_parent) {
            base.Enter(_parent);
            parent.colour = "red";
        }
        
        this.Reason = function () {
            //console.log(base.parent.target.position);
            var magnitude = Vector2.magnitude(this.parent.position, base.parent.target.position);
            
            if (STOP) {
                base.returnState = StatesEnum.specialWander;
                return false;
            }
            
            if (!base.parent.triggered) {  
                if (typeof(resetCharge) != 'undefined') {
                    setTimeout(cancleCharge, chargeCooldown);
                }
            } else if (typeof(resetCharge) == 'number') {
                clearInterval(resetCharge);
            }
            
            if (magnitude < attackRange) {
                base.returnState = StatesEnum.interact;
                return false;
            }
            
            return true;
        }
        
        this.Act = function () {
            
            base.parent.position = Vector2.subtract(
                base.parent.position,
                Vector2.multiply(
                    Vector2.unit (Vector2.subtract(base.parent.position, base.parent.target.position)), 
                chargeSpeed)
            );
            
        }
        
        this.Leave = function() {
            STOP = false;
            resetCharge = undefined;
            return base.Leave();
        }
        
        this.cancleCharge = function () {
            STOP = true;
            base.parent.target = undefined;
        }
    },

    Charge: function (_attackRange, _chargeSpeed, _chargeCoolDown) {
        
        this.__proto__ = new State();
        var base = this.__proto__;
        
        var attackRange = _attackRange || 20;
        var chargeSpeed = _chargeSpeed || 5;
        var chargeCooldown = _chargeCoolDown || 5;
        var resetCharge = undefined;
        var STOP = false;
        
        this.Enter = function (_parent) {
            base.Enter(_parent);
            parent.colour = "red";
        }
        
        this.Reason = function () {
            var magnitude = Vector2.magnitude(this.parent.position, base.parent.target.position);
            
            if (STOP) {
                base.returnState = StatesEnum.specialWander;
                return false;
            }
            
            if (!base.parent.triggered) {  
                if (typeof(resetCharge) != 'undefined') {
                    setTimeout(cancleCharge, chargeCooldown);
                }
            } else if (typeof(resetCharge) == 'number') {
                clearInterval(resetCharge);
            }
            
            if (magnitude < attackRange) {
                base.returnState = StatesEnum.interact;
                return false;
            }
            
            return true;
        }
        
        this.Act = function () {
            
            base.parent.position = Vector2.subtract(
                base.parent.position,
                Vector2.multiply(
                    Vector2.unit (Vector2.subtract(base.parent.position, base.parent.target.position)), 
                chargeSpeed)
            );
            
        }
        
        this.Leave = function() {
            STOP = false;
            resetCharge = undefined;

            return base.Leave();
        }
        
        this.cancleCharge = function () {
            STOP = true;
            base.parent.target = undefined;
        }
    },
    
    Shoot: function () {
        this.__proto__ = new State();
        var base = this.__proto__;
        var deltDamage = false;
        
        this.Enter = function (_parent) {
            base.Enter(_parent);
            _parent.colour = "black";
            deltDamage = false;
        }
        
        this.Reason = function () {
            if (deltDamage) {    
                //!if hit 
                base.returnState = StatesEnum.charge;
                //else
                base.returnState = StatesEnum.AngryWander; 
                                    
                return false;
            } return true;
        }
        
        this.Act = function () {
            var bullet = new Bullet({
                    position: Vector2.add(base.parent.position, Vector2.multiply(base.parent.forward, 1)),
                    size: new Vector2.new(3, 10),
                    rotation: Vector2.toAngle(Vector2.unit (Vector2.subtract(base.parent.position, base.parent.target.position))), 
                });
                base.parent.ignoreObjectIDs[bullet.ID] = true;
                base.parent.stage.addChild(bullet);
            deltDamage = true;
        }
        
        this.Leave = function() {
            return base.Leave();
        }
        
        this.cancleCharge = function () {
            STOP = true;
            base.parent.target = undefined;
        }
    },

    //__attack__
    Attack: function () {
        this.__proto__ = new State();
        var base = this.__proto__;
        var deltDamage = false;
        
        this.Enter = function (_parent) {
            base.Enter(_parent);
            _parent.colour = "black";
            deltDamage = false;
        }
        
        this.Reason = function () {
            if (deltDamage) {                        
                return false;
            } return true;
        }
        
        this.Act = function () {
            //console.log("YOU GOT HIT BY A SPOOK (get rekt)");
            deltDamage = true;
        }
        
        this.Leave = function() {
            return base.Leave();
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