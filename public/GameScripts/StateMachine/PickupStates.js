var PickupStates = {
    
    pickupInput: "82",
    
    pickupSpawnOffset: 50,
    
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
        
        var standardWalkSpeed = parent.walkSpeed;
        var maxInvulnerabilityTime = 250;
        var invulnerabilityCounter = 0;
        var walkSpeedMultiplier = 1.3;
        
        parent.invulnerabilityAmin = new Invulnerability({
            position: Vector2.new(0, 0),
            size: Vector2.new(parent.size.x, parent.size.y),
        })
        
        this.Enter =  function() {
            
            console.log("start invul");
            
            invulnerabilityCounter = 0;
            parent.walkSpeed *= walkSpeedMultiplier;
            
            parent.collisionEnter["staggerPlayerOnColl"] = function (Obj, dir, force, distance, canCollide) {
                if (Obj.ClassType == Enum.ClassType.Player) {
                    Obj.doStagger = true;
                }
            }
            
            parent.invulnerabilityAmin = new Invulnerability({
                position: Vector2.new(0, 0),
                size: Vector2.new(parent.size.x, parent.size.y),
            })
            
            parent.addChild(parent.invulnerabilityAmin);
        }
        
        this.Reason = function () { 
            invulnerabilityCounter++;
            //leave the state if our timer is over
            if(invulnerabilityCounter > maxInvulnerabilityTime) {
                self.returnState = undefined
                return false;
            } else 
                return true;
        }
        
        this.Leave =  function() {
            parent.invulnerabilityAmin.destroy();
            
            delete parent.collisionEnter["staggerPlayerOnColl"];
            
            parent.walkSpeed = standardWalkSpeed * parent.scale.x;
            console.log("invul over");
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
            
            var mine = new Enum.ClassName[Enum.ClassType.Mine]({
                size: new Vector2.new(40, 40),
                position: new Vector2.new(parent.position.x + -parent.scale.x * PickupStates.pickupSpawnOffset, parent.position.y),
            })
            
            mine.ignoreObjectType[Enum.ClassType.Unknown] = true; 
            mine.ignoreObjectIDs[parent.ID] = true;
            
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
            
            var ball = new Enum.ClassName[Enum.ClassType.Ball]({
                size: new Vector2.new(40, 40),
                position: new Vector2.new(parent.position.x + parent.scale.x * PickupStates.pickupSpawnOffset, parent.position.y),
            })
            ball.velocity.x = -parent.scale.x * 350;
            
            ball.ignoreObjectType[Enum.ClassType.Unknown] = true;
            ball.ignoreObjectIDs[parent.ID] = true;
            
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
            ammo = 6;
        }
        
        this.Reason = function () {
            
            if(!INPUT_CLICK[PickupStates.pickupInput])
                return true;
            
            ammo--;
            
            var throwAble = new Enum.ClassName[Enum.ClassType.ThrowAbleObject]({
                size: new Vector2.new(40, 40),
                position: new Vector2.new(parent.position.x + parent.scale.x * PickupStates.pickupSpawnOffset, parent.position.y),
                moveDirection: parent.scale.x 
            })
            
            throwAble.ignoreObjectType[Enum.ClassType.Unknown] = true;
            throwAble.ignoreObjectIDs[parent.ID] = true;
            
            parent.stage.addChild( throwAble );
            
            sendObject(throwAble, false, true);
            
            if(ammo > 0)
                return true;
            
            
            self.returnState = undefined;            
            return false;
        }
    },
}