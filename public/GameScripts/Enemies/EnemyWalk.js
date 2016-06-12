Enum.ClassName[Enum.ClassType.EnemyWalk] = EnemyWalk;

function EnemyWalk(properties) {
    this.parrent = new EnemyBase(properties, this)
    var self = this;

    self.size = Vector2.new(20, 20);
    self.hitbox = self.size;
    self.colour = 'blue';

    var sm = self.extends.AI;
    sm.AddState(StatesEnum.wander, new EnemyStates.NormalWander(500));
    sm.AddState(StatesEnum.specialWander, new EnemyStates.AngryWander(500));
    sm.AddState(StatesEnum.alert, new EnemyStates.Enrage(15, 15));
    sm.AddState(StatesEnum.charge, new EnemyStates.Charge(2800, 5, 5));
    sm.AddState(StatesEnum.interact, new EnemyStates.Attack());
    
}