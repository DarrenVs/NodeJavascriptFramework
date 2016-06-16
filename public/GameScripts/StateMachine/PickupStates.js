var PickupStates = {
    
    defaultState: function() {
        CreateState(this);
    },
    
    idle: function(_parent) {
        CreateState(this);
        var parent = _parent;
        var self = this;

        this.Reason = function () {        
            return false;
        }
    },
    
    invulnerabilityOnHold: function(_parent) {
        CreateState(this);
        var parent = _parent;
        var self = this;
        
        this.Reason = function () { 
            
            if(!INPUT_CLICK["18"]) {
                return true;
            }
            
            self.returnState = StatesEnum.invulnerabilityActivated;            
            return false;
        }
    },
    
    invulnerabilityActivated: function(_parent) {
        CreateState(this);
        var parent = _parent;
        var self = this;
        
        var invulnerabilityAmin;
        var maxInvulnerabilityTime = 100;
        var invulnerabilityCounter = 0;
          
        this.Enter =  function() {
            
            invulnerabilityAmin = new Enum.ClassName[Enum.ClassType.Platform_120x200]({
                size: new Vector2.new( 120,  200),
                position: new Vector2.new(self.parent.position.x, self.parent.position.y),
            })
            
            invulnerabilityCounter = 0;
            console.log("start invul");
            
            self.parent.walkSpeed *= 1.2;
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
            
            self.parent.walkSpeed /= 1.2;
            console.log(self.parent.walkSpeed);
            print("end invul");
            return self.returnState;
        }
    },
    
    mineOnHold: function(_parent) {
        CreateState(this);
        var parent = _parent;
        var self = this;
        
        var mine;
        
        this.Reason = function () { 
            console.log("mine");
            if(!INPUT_CLICK["18"]) {
                return true;
            }
            
            mine = new Enum.ClassName[Mine]({
                size: new Vector2.new(self.parent.size.x, self.parent.size.y),
                position: new Vector2.new(0, 0),
            })
                
            parent.stage.addChild( mine );
            
            self.returnState = undefined;            
            return false;
        }
    },
        
    ballOnHold: function(_parent) {
        CreateState(this);
        var parent = _parent;
        var self = this;
        
        var ball;
        
        this.Reason = function () { 
            console.log("ball");
            if(!INPUT_CLICK["18"]) {
                return true;
            }
            
            ball = new Enum.ClassName[Ball]({
                size: new Vector2.new(self.parent.size.x, self.parent.size.y),
                position: new Vector2.new(0, 0),
            })
                
            self.parent.stage.addChild( ball );
            
            self.returnState = undefined;            
            return false;
        }
    },
    
    throwAbleOnHold: function(_parent) {
        CreateState(this);
        var parent = _parent;
        var self = this;
        
        var throwAble;
        
        this.Reason = function () { 
            console.log("throw");
            if(!INPUT_CLICK["18"]) {
                return true;
            }
            
            throwAble = new Enum.ClassName[ThrowAbleObject]({
                size: new Vector2.new(self.parent.size.x, self.parent.size.y),
                position: new Vector2.new(0, 0),
            })
                
            self.parent.stage.addChild( throwAble );
            
            self.returnState = undefined;            
            return false;
        }
    },
}