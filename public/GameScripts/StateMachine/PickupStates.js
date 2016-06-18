var PickupStates = {
    
    pickupActivateInput: "82",
    
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
            
            if(!INPUT_CLICK[this.pickupActivateInput]) {
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
                position: new Vector2.new(parent.position.x, parent.position.y- 50),
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
            //console.log(self.parent.walkSpeed);
            return self.returnState;
        }
    },
    
    mineOnHold: function(_parent) {
        CreateState(this);
        var parent = _parent;
        var self = this;
        
        console.log("mine");
        
        this.Reason = function () { 

            if(!INPUT_CLICK[this.pickupActivateInput]) 
                return true;
            
            console.log("activated mine");
            var mine = new Enum.ClassName[Enum.ClassType.Mine]({
                size: new Vector2.new(40, 40),
                position: new Vector2.new(parent.position.x , parent.position.y - 80),
            })
            console.log(mine.ClassType);
            parent.ignoreObjectType[mine.ClassType] = true;  
            parent.stage.addChild( mine );
            
            self.returnState = undefined;            
            return false;
        }
    },
        
    ballOnHold: function(_parent) {
        CreateState(this);
        var parent = _parent;
        var self = this;
        
        console.log("ball");
        
        this.Reason = function () { 
            
            if(!INPUT_CLICK[this.pickupActivateInput])
                return true;
            
            console.log("activated ball");
            
            var ball = new Enum.ClassName[Enum.ClassType.Ball]({
                size: new Vector2.new(40, 40),
                position: new Vector2.new(parent.position.x, parent.position.y- 50),
            })
            parent.ignoreObjectType[ball.ClassType] = true;  
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
        
        console.log("throw");
        
        this.Reason = function () {
            
            if(!INPUT_CLICK[this.pickupActivateInput])
                return true;
            
            console.log("throw activated");
            
            ammo--;

            var throwAble = new Enum.ClassName[Enum.ClassType.ThrowAbleObject]({
                size: new Vector2.new(40, 40),
                position: new Vector2.new(parent.position.x, parent.position.y- 50),
            })
            
            parent.ignoreObjectType[throwAble.ClassType] = true;  
            parent.stage.addChild( throwAble );
            
            if(ammo > 0)
                return true;
            
            
            self.returnState = undefined;            
            return false;
        }
    },
}