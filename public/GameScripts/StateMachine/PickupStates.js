var PickupStates = {
    
    pickupActivateInput: "18",
    
    defaultState: function() {
        CreateState(this);
    },
    
    idle: function(_parent) {
        CreateState(this);
        var parent = _parent;
        var self = this;

        this.Reason = function () {        
            return true;
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
            
            invulnerabilityAmin = new Enum.ClassName[Enum.ClassType.Invulnerability]({
                size: new Vector2.new( 120,  200),
                position: new Vector2.new(parent.position.x, parent.position.y),
            })
            
            invulnerabilityAmin.playerToFollow = parent;
            invulnerabilityCounter = 0;
            console.log("start invul");
            
            parent.walkSpeed *= 1.2;
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
            
            parent.walkSpeed /= 1.2;
            console.log(self.parent.walkSpeed);
            print("end invul");
            return self.returnState;
        }
    },
    
    mineOnHold: function(_parent) {
        CreateState(this);
        var parent = _parent;
        var self = this;
        
        this.Reason = function () { 
            console.log("mine");
            if(!INPUT_CLICK["18"]) {
                return true;
            }
            console.log("activated mine");
            var mine = new Enum.ClassName[Enum.ClassType.Mine]({
                size: new Vector2.new(40, 40),
                position: new Vector2.new(parent.position.x, parent.position.y),
            })
            parent.ignoreObjectIDs[mine.ID] = true; 
            parent.stage.addChild( mine );
            
            self.returnState = undefined;            
            return false;
        }
    },
        
    ballOnHold: function(_parent) {
        CreateState(this);
        var parent = _parent;
        var self = this;
        
        this.Reason = function () { 
            console.log("ball");
            if(!INPUT_CLICK["18"]) {
                return true;
            }
            
            var ball = new Enum.ClassName[Enum.ClassType.Ball]({
                size: new Vector2.new(40, 40),
                position: new Vector2.new(parent.position.x, parent.position.y),
            })
            parent.ignoreObjectIDs[ball.ID] = true;  
            parent.stage.addChild( ball );
            
            self.returnState = undefined;            
            return false;
        }
    },
    
    throwAbleOnHold: function(_parent) {
        CreateState(this);
        var parent = _parent;
        var self = this;
        
        var ammo = 6;
        
        this.Reason = function () { 
            console.log("throw");
            if(!INPUT_CLICK["18"]) {
                return true;
            }
            
            ammo--;

            var throwAble = new Enum.ClassName[Enum.ClassType.ThrowAbleObject]({
                size: new Vector2.new(40, 40),
                position: new Vector2.new(parent.position.x, parent.position.y),
            })
            
            parent.ignoreObjectIDs[throwAble.ID] = true;
            parent.stage.addChild( throwAble );
            
            if(ammo > 0) {
                return true;
            }
            self.returnState = undefined;            
            return false;
        }
    },
}