Enum.ClassName[Enum.ClassType.EnemyWalk] = EnemyWalk;

function EnemyWalk(properties) {
    this.parrent = new EnemyBase(this, properties)
    var self = this;

    self.size = Vector2.new(20, 20);
    self.hitbox = self.size;
    self.colour = 'blue';
    self.ClassType = Enum.ClassType.EnemyWalk;

    var sm = self.extends.AI;
    sm.AddState(StatesEnum.wander, new EnemyStates.NormalWander(this, 500));
    sm.AddState(StatesEnum.specialWander, new EnemyStates.AngryWander(this, 500));
    sm.AddState(StatesEnum.alert, new EnemyStates.Enrage(this, 15, 15));
    sm.AddState(StatesEnum.charge, new EnemyStates.Charge(this, 2800, 5, 5));
    sm.AddState(StatesEnum.interact, new EnemyStates.Attack(this));
    
}