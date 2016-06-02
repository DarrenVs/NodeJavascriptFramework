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
    NormalWander: function (_alertRange, _walkSpeed) {
        this.__proto__ = new State();
        var base = this.__proto__;
        var alertRange = _alertRange || 80;
        
        var enemies = [];
        this.Enter = function (_parent) {
            base.Enter(_parent);
            _parent.colour = "blue";
                        
            _parent.extends["Navigation"] = AutomaticWalk(_parent, _walkSpeed);
        }
        
        this.Reason = function () {
            if (Vector2.magnitude(this.parent.position, base.parent.stage.mousePosition) < alertRange) {
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
    
    AngryWander: function (_alertRange, _walkSpeed) {
        this.__proto__ = new State();
        var base = this.__proto__;
        var alertRange = _alertRange || 80;
        
        var enemies = [];
        this.Enter = function (_parent) {
            base.Enter(_parent);
            _parent.colour = "red";
            
            _parent.extends["Navigation"] = AutomaticWalk(_parent, _walkSpeed);
        }
        
        this.Reason = function () {
            if (Vector2.magnitude(this.parent.position, base.parent.stage.mousePosition) < alertRange) {
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
    Enrage: function (_responseTime, _range) {
        this.__proto__ = new State();
        var base = this.__proto__;
        var responseTime = _responseTime || 20;
        var range = _range || 100;
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
            if (Vector2.magnitude(this.parent.position, base.parent.stage.mousePosition) > range){
                base.returnState = StatesEnum.specialWander;
                return false;
            }
            
             return true;       
        }
        
        this.Act = function () {
                base.parent.position = Vector2.new(
                    base.parent.position.x + Math.random() * 4 - 2,
                    base.parent.position.y + Math.random() * 4 - 2);
                    
            timeLeft -= 0.2;
        }
        
        this.Leave = function() {
            return base.Leave();
        }
    },
    
    //____Idle____
    Charge: function (_range, _attackRange, _attackSpeed) {
        
        this.__proto__ = new State();
        var base = this.__proto__;
        var range = _range || 180;
        var attackRange = _attackRange || 20;
        var attackSpeed = _attackSpeed || 5;
        
        this.Enter = function (_parent) {
            base.Enter(_parent);
            parent.colour = "yellow";
        }
        
        this.Reason = function () {
            var magnitude = Vector2.magnitude(this.parent.position, base.parent.stage.mousePosition);
            if (magnitude > range){
                base.returnState = StatesEnum.specialWander;
                return false;
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
                    Vector2.unit (Vector2.subtract(base.parent.position, base.parent.stage.mousePosition)), 
                attackSpeed)
            );
            
        }
        
        this.Leave = function() {
            return base.Leave();
        }
    },

    //__attack__
    Attack: function () {
        this.__proto__ = new State();
        var base = this.__proto__;
        var deltDamage = false;
        
        this.Enter = function (_parent) {
            base.Enter(_parent);
            _parent.colour = "orange";
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