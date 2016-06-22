var PickupStates = {
    
    pickupInput: "82",
    
    pickupSpawnOffset: 60,
    
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
            
            if(!INPUT_CLICK[PickupStates.pickupInput]) {
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
        var maxInvulnerabilityTime = 300;
        var invulnerabilityCounter = 0;
        var walkSpeedMultiplier = 1.3;
        
        this.Enter =  function() {
            console.log("activated invulnerability");
            invulnerabilityAmin = new Enum.ClassName[Enum.ClassType.Invulnerability]({
                size: new Vector2.new( 120,  200),
                position: new Vector2.new(parent.position.x, parent.position.y),
            })
            
            invulnerabilityAmin.playerToFollow = parent;
            invulnerabilityCounter = 0;
            console.log("start invul");
            
            parent.walkSpeed *= walkSpeedMultiplier;
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
            
            parent.walkSpeed = 200;
            console.log(parent.walkSpeed);
            return self.returnState;
        }
    },
    
    mineOnHold: function(_parent) {
        CreateState(this);
        var parent = _parent;
        var self = this;
        
        this.Reason = function () { 
            
            if(!INPUT_CLICK[PickupStates.pickupInput]) 
                return true;
            
            console.log("activated mine");
            
            var mine = new Enum.ClassName[Enum.ClassType.Mine]({
                size: new Vector2.new(40, 40),
                position: new Vector2.new(parent.position.x + -parent.scale.x * PickupStates.pickupSpawnOffset, parent.position.y),
            })
            
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
        
        this.Reason = function () { 
            
            if(!INPUT_CLICK["82"])
                return true;
            
            console.log("activated ball");
            
            var ball = new Enum.ClassName[Enum.ClassType.Ball]({
                size: new Vector2.new(40, 40),
                position: new Vector2.new(parent.position.x + parent.scale.x * PickupStates.pickupSpawnOffset, parent.position.y),
            })
            ball.velocity.x = parent.scale.x * 350;
            
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
        
        this.Enter =  function() {
            ammo = 6
            console.log("reset ammo!");
        }
        
        this.Reason = function () {
            
            if(!INPUT_CLICK[PickupStates.pickupInput])
                return true;
            
            console.log("activated bullet");
            
            ammo--;
            
            var throwAble = new Enum.ClassName[Enum.ClassType.ThrowAbleObject]({
                size: new Vector2.new(40, 40),
                position: new Vector2.new(parent.position.x + parent.scale.x * PickupStates.pickupSpawnOffset, parent.position.y),
            }, 
                parent.scale.x                                                                 
            )
            
            parent.ignoreObjectType[throwAble.ClassType] = true;  
            parent.stage.addChild( throwAble );
            
            if(ammo > 0)
                return true;
            
            
            self.returnState = undefined;            
            return false;
        }
    },
}