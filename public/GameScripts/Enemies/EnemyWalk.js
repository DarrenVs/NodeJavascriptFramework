Enum.ClassName[Enum.ClassType.EnemyWalk] = EnemyWalk;

function EnemyWalk(properties) {
    new EnemyBase(this, properties)
    var self = this;

    self.size = Vector2.new(20, 20);
    self.hitbox = self.size;
    self.colour = 'blue';
    self.ClassType = Enum.ClassType.EnemyWalk;

    var sm = self.extends.AI;
    sm.AddState(StatesEnum.wander, new EnemyStates.NormalWander(self, 200));
    sm.AddState(StatesEnum.specialWander, new EnemyStates.AngryWander(self, 500));
    sm.AddState(StatesEnum.alert, new EnemyStates.Enrage(self, 15, 15));
    sm.AddState(StatesEnum.charge, new EnemyStates.Charge(self, 2800, 5, 5));
    sm.AddState(StatesEnum.interact, new EnemyStates.Attack(self));
    
}