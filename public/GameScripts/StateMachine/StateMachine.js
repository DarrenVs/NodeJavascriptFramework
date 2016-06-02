/*States enum. Here you define what states the StateMachine will have */

//((((((((((((()))))))))))))\\
//STATE MACHINE ENUM
StatesEnum = {
    wander: 'wander',
    specialWander: 'specialWander',
    alert: 'alert',
    charge: 'charge',
    interact: 'interact'
}
//((((((((((((()))))))))))))\\

/* 
    You can create a state machine like so {
        
        AI = new StateMachine();
    }    
    Then you can add states by calling the AddState function and giving it the key from
    the enum and the state that you wrote ("wich needs to extent State") {
        
        AI.AddState(StatesEnum.wander, new wander());
    }             
    Inhereting from state {
    
        (in the function you created) 
        this.__proto__ = new State();
        
        (optional is) 
        var base = this.__proto__;
        (this way you can call base.aFunction to call function in the parrent class)
    }
    Makig a state class is just overwriting the state interface and filling in what should be there
    
    The parameters and return values do need to rewritten otherwise the class wont do anything
    and the machine will just go the the default state.
*/



//----------------------------\\
//STATE INTERFACE
State = function () {
    this.parent = undefined;
    this.returnState = undefined;
    //Just to be able to check if it is a state
    this.isState = true;

    this.Enter = function (_parent) { /* gives the start information */
        this.parent = _parent;
    };
    this.Reason = function () { /* returns true if it can act and false if it should go to an 
                                other state and what state is should go in*/ 
       /* if (enemyInSight) {
            returnState = StatesEnum.alert;
            return false;
        } else return true; */
        
        return false;
    };
    this.Act = function () { /* do the things this state does */ 
        
    };
    this.Leave = function () { /* returns new state key if you return nothing it will go to default */ 
        //Rest the variables that you want to be "clean"for the next use
        return this.returnState;
    };
}
//----------------------------\\



//<<<<<<<<<<<<<>>>>>>>>>>>>>>>\\
//STATE MACHINE
StateMachine = function (_parent, _defaultStateKey, debug) {
    //This will hold the states with their value
    var states = {};
    //Set default state
    var defaultStateKey = _defaultStateKey;
    var defaultKeyActive = false;
    
    var parent = _parent;
    var currentState;
    
    //Copies the states from StatesEnum 
    for (key in StatesEnum)
        states[key] = 1;
        
        
    //Add the state if on a spot if it is extended from State (id is a StatesEnum state)
    this.AddState = function (id, state) {
        if (typeof(states[id]) != 'undefined') {        
            if (state.__proto__.isState) {
                if (id == defaultStateKey) {
                    currentState = state;
                    currentState.Enter(parent);
                    defaultKeyActive = true;
                    states[id] = state;
                    
                } else states[id] = state;
            } else throw "State " + state + " is not extended from the type State";
        } else throw "Trying to add state " + state + " but the key is not a valid key";
    }
    
    //The core logic (should speak for itself)
    _parent.update["statemachine"] = function () {

        if (defaultKeyActive) {

            if (currentState.Reason()) {
                currentState.Act();
            } else {
                var newStateKey = currentState.Leave();
                
                if (typeof(states[newStateKey]) != 'undefined') {
                    if (debug)
                        console.log("changing to state: " + newStateKey);
                    currentState = states[newStateKey];
                } else {
                    if (debug)
                        console.log("switching to defualt");
                    currentState = states[defaultStateKey];
                }
                currentState.Enter(parent);
            }
        
        }
    }
}
//<<<<<<<<<<<<<>>>>>>>>>>>>>>>\\
