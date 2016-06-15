var PickupStates = {
    
    defaultState: function() {
        var base = this.__proto__ = new State();
    },
    
    idle: function() {
        var base = this.__proto__ = new State();

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
        CreateState(this);
        
        var invulnerabilityAmin;
        var maxInvulnerabilityTime = 100;
        var invulnerabilityCounter = 0;
          
        this.Enter =  function(parent) {
            base.Enter(parent);
            
            invulnerabilityAmin = new Enum.ClassName[Enum.ClassType.Platform_120x200]({
                size: new Vector2.new( 120,  200),
                position: new Vector2.new(base.parent.position.x, base.parent.position.y),
            })
            
            invulnerabilityCounter = 0;
            console.log("start invul");
            
            base.parent.walkSpeed *= 1.2;
        }
        
        this.Reason = function () { 
            invulnerabilityCounter++;
            if(maxInvulnerabilityTime < invulnerabilityCounter)
                return false;
            else 
                return true;
        }
        
        this.Leave =  function() {
            invulnerabilityAmin.destroy();
            
            base.parent.walkSpeed /= 1.2;
            console.log(base.parent.walkSpeed);
            print("end invul");
            return base.Leave();
        }
    },
    
    mineOnHold: function() {
        CreateState(this);
        
        var mine;
        
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
        CreateState(this);
        
        var ball;
        
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
        CreateState(this);
        
        var throwAble;
        
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