Enum.ClassName[Enum.ClassType.EnemyShoot] = EnemyShoot;

function EnemyShoot (properties) {
    this.__proto__ = new EnemyBase(properties, this);
    var self = this;
       
    self.size = Vector2.new(20, 20);
    self.hitbox = self.size;
    self.colour = 'red';

    var sm = self.extends.AI;
    sm.AddState(StatesEnum.wander, new EnemyStates.NormalWander(350));
    sm.AddState(StatesEnum.specialWander, new EnemyStates.AngryWander(500));
    sm.AddState(StatesEnum.alert, new EnemyStates.Enrage(20, 15));
    sm.AddState(StatesEnum.charge, new EnemyStates.ChargeGun(500, 5, 5));
    sm.AddState(StatesEnum.interact, new EnemyStates.Shoot());
    
}