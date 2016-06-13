pickupStates = {
    
    defaultState: {
        var base = this.__proto__ = new State();
    },
    
    invulnerability: function() {
        var base = this.__proto__ = new State();
        
        this.Enter =  function(parent) {
            base.Enter(parent);
        }
    },
    
    mine: function() {
        var base = this.__proto__ = new State();
        
        this.Enter = function(parent) {
            base.Enter(parent);
            
        };   
    },
        
    ball: function() {
        var base = this.__proto__ = new State();
        
        this.Enter = function(parent) {
            base.Enter(parent);
            
        }; 
    },
    
    throwAble: function() {
        var base = this.__proto__ = new State();
        
        this.Enter = function(parent) {
            base.Enter(parent);
            
        };   
    },
}