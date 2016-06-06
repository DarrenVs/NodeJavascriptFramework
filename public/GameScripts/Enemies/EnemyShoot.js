function EnemyShoot (properties) {
    this.__proto__ = new EnemyBase(properties, this);
    var self = this;
       
    var sm = self.extends.AI;
    sm.AddState(StatesEnum.wander, new EnemyStates.NormalWander(350));
    sm.AddState(StatesEnum.specialWander, new EnemyStates.AngryWander(500));
    sm.AddState(StatesEnum.alert, new EnemyStates.Enrage(300, 15));
    sm.AddState(StatesEnum.charge, new EnemyStates.ChargeGun(20, 5, 5));
    sm.AddState(StatesEnum.interact, new EnemyStates.Shoot());
    
}