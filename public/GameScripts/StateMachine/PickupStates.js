var PickupStates = {
    
    defaultState: function() {
        CreateState(this);
        var base = this;
    },
    
    idle: function(_parent) {
        
        CreateState(this);
    },
    
    invulnerabilityOnHold: function(_parent) {
        CreateState(this);
        var self = this;
        var parent = _parent;

        self.Reason = function () { 
            
            if(!INPUT_CLICK["18"]) {
                return true;
            }
            
            self.returnState = StatesEnum.invulnerabilityActivated;            
            return false;
        }
    },
        
    
    invulnerabilityActivated: function(_parent) {
        CreateState(this);
        var self = this;
        var parent = _parent;
        
        self.invulnerabilityAmin;
        self.maxInvulnerabilityTime = 400;
        self.invulnerabilityCounter = 0;
          
        self.Enter =  function() {
            
            self.invulnerabilityAmin = new Enum.ClassName[Enum.ClassType.Platform_120x200]({
                size: new Vector2.new( 40,  40),
                position: new Vector2.new(self.parent.position.x, self.parent.position.y),
            })
            
            self.invulnerabilityCounter = 0;
            console.log("start invul");
            
            self.parent.walkSpeed *= 1.2;
        }
        
        self.Reason = function () { 
            self.invulnerabilityCounter++;
            if(self.maxInvulnerabilityTime < self.invulnerabilityCounter)
                return false;
            else 
                return true;
        }
        
        self.Leave =  function(_parent) {
            self.invulnerabilityAmin.destroy();
            
            self.parent.walkSpeed /= 1.2;
            console.log(self.parent.walkSpeed);
            print("end invul");
            return self.returnState;
        }
    },
    
    mineOnHold: function(_parent) {
        CreateState(this);
        var self = this;
        var parent = _parent;
        
        self.mine;
        
        self.Reason = function () { 
            console.log("mine");
            if(!INPUT_CLICK["18"]) {
                return true;
            }
            
            mine = new Enum.ClassName[Mine]({
                size: new Vector2.new(self.parent.size.x, self.parent.size.y),
                position: new Vector2.new(0, 0),
            })
                
            self.parent.stage.addChild( mine );
            
            self.returnState = undefined;            
            return false;
        }
    },
        
    ballOnHold: function(_parent) {
        CreateState(this);
        var self = this;
        var parent = _parent;
        
        self.ball;
        
        self.Reason = function () { 
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
        var self = this;
        var parent = _parent;
        
        self.throwAble;
        
        self.Reason = function () { 
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