var PickupStates = {
    
    defaultState: function() {
        CreateState(this);
        var base = this;
    },
    
<<<<<<< HEAD
    idle: function() {
        var base = this.__proto__ = new State();

        this.Enter =  function(parent) {
            base.Enter(parent);
        }
=======
    idle: function(_parent) {
>>>>>>> origin/Game
        
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
        
<<<<<<< HEAD
        var invulnerabilityAmin;
        var maxInvulnerabilityTime = 100;
        var invulnerabilityCounter = 0;
=======
        self.invulnerabilityAmin;
        self.maxInvulnerabilityTime = 400;
        self.invulnerabilityCounter = 0;
>>>>>>> origin/Game
          
        self.Enter =  function() {
            
<<<<<<< HEAD
            invulnerabilityAmin = new Enum.ClassName[Enum.ClassType.Platform_120x200]({
                size: new Vector2.new( 120,  200),
                position: new Vector2.new(base.parent.position.x, base.parent.position.y),
            })
            
            invulnerabilityCounter = 0;
=======
            self.invulnerabilityAmin = new Enum.ClassName[Enum.ClassType.Platform_120x200]({
                size: new Vector2.new( 40,  40),
                position: new Vector2.new(self.parent.position.x, self.parent.position.y),
            })
            
            self.invulnerabilityCounter = 0;
>>>>>>> origin/Game
            console.log("start invul");
            
            self.parent.walkSpeed *= 1.2;
        }
        
<<<<<<< HEAD
        this.Reason = function () { 
            invulnerabilityCounter++;
            if(maxInvulnerabilityTime < invulnerabilityCounter)
=======
        self.Reason = function () { 
            self.invulnerabilityCounter++;
            if(self.maxInvulnerabilityTime < self.invulnerabilityCounter)
>>>>>>> origin/Game
                return false;
            else 
                return true;
        }
        
<<<<<<< HEAD
        this.Leave =  function() {
            invulnerabilityAmin.destroy();
=======
        self.Leave =  function(_parent) {
            self.invulnerabilityAmin.destroy();
>>>>>>> origin/Game
            
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
        
<<<<<<< HEAD
        var mine;
=======
        self.mine;
>>>>>>> origin/Game
        
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
        
<<<<<<< HEAD
        var ball;
=======
        self.ball;
>>>>>>> origin/Game
        
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
        
<<<<<<< HEAD
        var throwAble;
=======
        self.throwAble;
>>>>>>> origin/Game
        
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