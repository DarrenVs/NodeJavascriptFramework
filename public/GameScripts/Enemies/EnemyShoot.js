Enum.ClassName[Enum.ClassType.EnemyShoot] = EnemyShoot;

function EnemyShoot (properties) {
    EnemyBase(this, properties);
    var self = this;
       
    self.size = Vector2.new(20, 20);
    self.hitbox = self.size;
    self.colour = 'red';
    self.ClassType = Enum.ClassType.EnemyShoot;

    var sm = self.extends.AI;
    sm.AddState(StatesEnum.wander, new EnemyStates.NormalWander(self, 200));
    sm.AddState(StatesEnum.specialWander, new EnemyStates.AngryWander(self, 500));
    sm.AddState(StatesEnum.alert, new EnemyStates.Enrage(self, 50, 15));
    sm.AddState(StatesEnum.charge, new EnemyStates.ChargeGun(self, 500, 5, 5));
    sm.AddState(StatesEnum.interact, new EnemyStates.Shoot(self));
        self.walkSpeed = -self.walkSpeed;

}