var PickupStates = {
    
    defaultState: function() {
        var base = this.__proto__ = new State();
    },
    
    idle: function() {
        var base = this.__proto__ = new State();
        
        this.Enter =  function(parent) {
            base.Enter(parent);
        }
    },
    
    invulnerabilityOnHold: function() {
        var base = this.__proto__ = new State();
        
        this.Reason = function () { 
            
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
            
            if(!INPUT_CLICK["18"]) {
                return false;
            }
            
            base.returnState = undefined;            
            return true;
        }
    },
        
    ballOnHold: function() {
        var base = this.__proto__ = new State();
        
        this.Reason = function () { 
            
            if(!INPUT_CLICK["18"]) {
                return false;
            }
            
            base.returnState = undefined;            
            return true;
        }
    },
    
    throwAbleOnHold: function() {
        var base = this.__proto__ = new State();
        
        this.Reason = function () { 
            
            if(!INPUT_CLICK["18"]) {
                return false;
            }
            
            base.returnState = undefined;            
            return true;
        }
    },
}