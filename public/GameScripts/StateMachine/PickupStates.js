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
            
            if(!INPUT_CLICK["18"]) {
                return true;
            }
            
            base.returnState = StatesEnum.invulnerabilityActivated;            
            return false;
        }
    },
        
    
    invulnerabilityActivated: function() {
        var base = this.__proto__ = new State();
        
        this.invulnerabilityAmin;
        this.maxInvulnerabilityTime = 400;
        this.invulnerabilityCounter = 0;
          
        this.Enter =  function(parent) {
            base.Enter(parent);
            
            this.invulnerabilityAmin = new Enum.ClassName[Enum.ClassType.Platform_120x200]({
                size: new Vector2.new( 40,  40),
                position: new Vector2.new(base.parent.position.x, base.parent.position.y),
            })
            
            this.invulnerabilityCounter = 0;
            console.log("start invul");
        }
        
        this.Reason = function () { 
            this.invulnerabilityCounter++;
            if(this.maxInvulnerabilityTime < this.invulnerabilityCounter)
                return false;
            else 
                return true;
        }
        
        this.Leave =  function() {
            this.invulnerabilityAmin.destroy();
            print("end invul");
            return base.Leave();
        }
    },
    
    mineOnHold: function() {
        var base = this.__proto__ = new State();
        
        this.mine;
        
        this.Reason = function () { 
            console.log("mine");
            if(!INPUT_CLICK["18"]) {
                return true;
            }
            
            mine = new Enum.ClassName[Mine]({
                size: new Vector2.new(base.parent.size.x, base.parent.size.y),
                position: new Vector2.new(0, 0),
            })
                
            base.parent.stage.addChild( mine );
            
            base.returnState = undefined;            
            return false;
        }
    },
        
    ballOnHold: function() {
        var base = this.__proto__ = new State();
        
        this.ball;
        
        this.Reason = function () { 
            console.log("ball");
            if(!INPUT_CLICK["18"]) {
                return true;
            }
            
            ball = new Enum.ClassName[Ball]({
                size: new Vector2.new(base.parent.size.x, base.parent.size.y),
                position: new Vector2.new(0, 0),
            })
                
            base.parent.stage.addChild( ball );
            
            base.returnState = undefined;            
            return false;
        }
    },
    
    throwAbleOnHold: function() {
        var base = this.__proto__ = new State();
        
        this.throwAble;
        
        this.Reason = function () { 
            console.log("throw");
            if(!INPUT_CLICK["18"]) {
                return true;
            }
            
            throwAble = new Enum.ClassName[ThrowAbleObject]({
                size: new Vector2.new(base.parent.size.x, base.parent.size.y),
                position: new Vector2.new(0, 0),
            })
                
            base.parent.stage.addChild( throwAble );
            
            base.returnState = undefined;            
            return false;
        }
    },
}