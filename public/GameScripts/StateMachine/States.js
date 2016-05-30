//----------------------------\\
/*
--REFERENCE  STATE INTERFACE-- 
this.State = {
    parent: undefined,
    returnState: parent.defaultStateKey,
    isState: true,

    Enter: function (_parent) { parent = _parent },
    Reason: function () { return false; },
    Act: function () { },
    Leave: function () { return returnState; }
}
*/
//----------------------------\\

this.Wander = function () {
   this.__proto__ = new State();
   var base = this.__proto__;
   
   this.Enter = function (_parent) {
       base.Enter(_parent);
       
   }
   
   this.Reason = function () {
       
       ithis.collisionEvents["CollisionWithPlayer"] = function(Obj) {
            if (Obj.ClassType == Enum.ClassType.Player) 
                returnState = states.interact;
                return false;
            }
        }
       
       return true;
   }
   
   
   this.Act = function () {
       
   }
   
}

/*
this.EnemyAI = function () {
    var machine = new StateMachine(this, StatesEnum.wander);
    
    machine.AddState(StatesEnum.wander, new Wander());
    machine.AddState(StatesEnum.interact, new Attack());
    machine.AddState(StatesEnum.alert, new FocusOnEnemy());
    machine.AddState(StatesEnum.retreat, new Block());
    machine.AddState(StatesEnum.idle, new Idle());
    
    this.update['EnemyUpdate'] = function () {
        machine.UpdateMachine();
    }
}
*/


var inputs = [59 ,29, 10, 66];
var endInputs = [];

for (var i = 0; i < inputs.length; i++) {
    if (inputs[i] > endInputs[0]) endInputs.insert(0, inputs[i]);
    else {
        
        
    }
}