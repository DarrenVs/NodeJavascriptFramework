this.States = {
    wander, 
    alert, 
    interact,
    retreat,
    idle
}



class State {
    constructor(size) {
        this.length = size;
    }
    
    get State () {
        return this.length;
    }
    
    set State(value) {
        this.length = value;
    }
} 




this.StateMachine = function (parent, ) {
    
}