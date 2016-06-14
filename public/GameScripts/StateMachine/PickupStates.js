var PickupStates = {
    
    defaultState: function() {
        var base = this.__proto__ = new State();
    },
    
    idle: function() {
        var base = this.__proto__ = new State();
        var base 
        this.Enter =  function(parent) {
            base.Enter(parent);
        }
        
        this.Reason = function () {        
            return false;
        }
    },
    
    invulnerabilityOnHold: function() {
        var base = this.__proto__ = new State();
        
        this.Reason = function () { 
            
            console.log("inv");
            
            if(!INPUT_CLICK["18"]) {
                return false;
            }
            
            base.returnState = StatesEnum.invulnerabilityActivated;            
            return true;
        }
    },
        
    
    invulnerabilityActivated: function() {
        var base = this.__proto__ = new State();
        
        var invulnerabilityAmin;
        
        this.Enter =  function(parent) {
            base.Enter(parent);
            
            invulnerabilityAmin = new Enum.ClassName[Invulnerability]({
                size: new Vector2.new(base.parent.size.x, base.parent.size.y),
                position: new Vector2.new(0, 0),
            })
                
            base.parent.stage.addChild( newObject );
        }
        
        this.Leave =  function() {
            base.parent
            
            invulnerabilityAmin.destroy();
            
            return base.Leave();
        }
    },
    
    mineOnHold: function() {
        var base = this.__proto__ = new State();
        
        this.Reason = function () { 
            console.log("mine");
            if(!INPUT_CLICK["18"]) {
                return false;
            }
            
            mine = new Enum.ClassName[Mine]({
                size: new Vector2.new(base.parent.size.x, base.parent.size.y),
                position: new Vector2.new(0, 0),
            })
                
            base.parent.stage.addChild( mine );
            
            base.returnState = undefined;            
            return true;
        }
    },
        
    ballOnHold: function() {
        var base = this.__proto__ = new State();
        
        this.Reason = function () { 
            console.log("ball");
            if(!INPUT_CLICK["18"]) {
                return false;
            }
            
            ball = new Enum.ClassName[Ball]({
                size: new Vector2.new(base.parent.size.x, base.parent.size.y),
                position: new Vector2.new(0, 0),
            })
                
            base.parent.stage.addChild( ball );
            
            base.returnState = undefined;            
            return true;
        }
    },
    
    throwAbleOnHold: function() {
        var base = this.__proto__ = new State();
        
        this.Reason = function () { 
            console.log("throw");
            if(!INPUT_CLICK["18"]) {
                return false;
            }
            
            throwAble = new Enum.ClassName[ThrowAbleObject]({
                size: new Vector2.new(base.parent.size.x, base.parent.size.y),
                position: new Vector2.new(0, 0),
            })
                
            base.parent.stage.addChild( throwAble );
            
            base.returnState = undefined;            
            return true;
        }
    },
}