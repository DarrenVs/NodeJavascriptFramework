/*States enum. Here you define what states the StateMachine will have */

"use strict";
//((((((((((((()))))))))))))\\
//STATE MACHINE ENUM
var StatesEnum = {
    idle: 'idle',
    
    //enemy
    wander: 'wander',
    specialWander: 'specialWander',
    alert: 'alert',
    charge: 'charge',
    interact: 'interact',

    //player
    jump: 'jump',
    extraJump: 'extraJump',
    specialJump: 'specialJump',
    slide: 'slide',
    stun: 'stun',
    inAir: 'inAir',
    
    //pickups
    invulnerabilityOnHold: 'invulnerabilityOnHold',
    invulnerabilityActivated: 'invulnerabilityActivated',
    mineOnHold: 'mineOnHold',
    ballOnHold: 'ballOnHold',
    throwAbleOnHold: 'throwAbleOnHold',
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
var State = function () {
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


var updateCounter = 0;
//<<<<<<<<<<<<<>>>>>>>>>>>>>>>\\
//STATE MACHINE
var StateMachine = function (_parent, _defaultStateKey, setup, anyState, debug) {
    //This will hold the states with their value
    var states = {};
    //Set default state
    var defaultStateKey = _defaultStateKey;
    var defaultKeyActive = false;
    
    var parent = _parent;
    var currentState;

    var self = this;
    
    //Copies the states from StatesEnum 
    for (var key in StatesEnum)
        states[key] = 1;
        
    if (setup) setup(parent);
    //Add the state if on a spot if it is extended from State (id is a StatesEnum state)
    this.AddState = function (id, state) {
        if (typeof(states[id]) != 'undefined') {        
            if (state.__proto__.isState) {
                if (id == defaultStateKey) {
                    currentState = state;
                    currentState.Enter(parent);
                    defaultKeyActive = true;
                    states[id] = state;
                    if (debug) console.log("setting state to default " + defaultStateKey);

                } else states[id] = state;
            } else throw "State " + state + " is not extended from the type State";
        } else throw "Trying to add state " + state + " but the key is not a valid key";
    }
    
    //The core logic (should speak for itself)
    parent.update["statemachine" + updateCounter++] = function () {
        if (defaultKeyActive) {

            if (currentState.Reason()) {
                currentState.Act();
            } else {
                self.ChangeState(currentState.Leave());
                currentState.Enter(parent);
            }
        }

        if (anyState) {
            anyState.Act();
            if (anyState.Return()) {
                self.ChangeState(anyState.Return());
            }
        }
    }

    //!!!ONly use if really necessary!!!\\
    this.ChangeState = function (_newStateKey) {
        self.newStateKey = _newStateKey;
        if (typeof(states[self.newStateKey]) != 'undefined') {
            if (debug) console.log("changing to state: " + self.newStateKey);
            currentState = states[self.newStateKey];
        } else {
            if (debug) console.log("switching to defualt: " + defaultStateKey);
            currentState = states[defaultStateKey];
        }
    }
}
//<<<<<<<<<<<<<>>>>>>>>>>>>>>>\\
