var CollisionGrid = {
    gridSize: Vector2.new(14000, 10040),
    grid:{
        
    },
    
    
    
    new:function( pos, size, Obj ) {
        
        var Grids = {};
        
        for (var index in Vector2.directions) {
            
            var gridLocation = Vector2.new(
                Math.floor((pos.x + Vector2.directions[index].x * Obj.hitbox.x) / CollisionGrid.gridSize.x) * CollisionGrid.gridSize.x,
                Math.floor((pos.y + Vector2.directions[index].y * Obj.hitbox.y) / CollisionGrid.gridSize.y) * CollisionGrid.gridSize.y
            );

            if (!CollisionGrid.grid[gridLocation.x + "x" + gridLocation.y])
                CollisionGrid.grid[gridLocation.x + "x" + gridLocation.y] = {};

            if (!CollisionGrid.grid[gridLocation.x + "x" + gridLocation.y][Obj.ID])
                CollisionGrid.grid[gridLocation.x + "x" + gridLocation.y][Obj.ID] = true;

            if (!Grids[gridLocation.x + "x" + gridLocation.y])
                Grids[gridLocation.x + "x" + gridLocation.y] = true;
        }
        
        return Grids;
    },
    
    testedObjects: {
        //to prevent objects from updating twice or more if they are child of more than one grid
    }
}


//Sub Class
function Collision(Parent) {
    var Parent = Parent;
    var self = this;
    
    Parent.colliderType = Parent.colliderType || Enum.colliderType.box;
    Parent.hitbox = Parent.hitbox || Vector2.new(50, 50);
    Parent.mass = Parent.mass || 1;
    Parent.ignoreObjectIDs = Parent.ignoreObjectIDs || {};
    Parent.ignoreObjectType = Parent.ignoreObjectType || {};
    Parent.collisionEvents = Parent.collisionEvents || {};
    Parent.collisionActive = Parent.collisionActive ||true;
    Parent.Position = Parent.position;
    
    Parent.oldGrids = {};
    
    Parent.__defineSetter__('position', function(val) {
        Parent.Position = val;
        
        if (val) {
            var newGrids = CollisionGrid.new( val, 0, Parent );
            
            for (var oldGrid in Parent.oldGrids) {
                
                if (!newGrids[oldGrid])
                    delete CollisionGrid.grid[oldGrid][Parent.ID];
            }
            
            //for (var oldGrid in Pare)
            Parent.oldGrids = newGrids;
            
            //CollisionLoop[Parent.ID] = Parent;
        }
    })
    Parent.__defineGetter__('position', function(val) {
        return Parent.Position;
    })
    Parent.position = Parent.position;
    
    
    
    Parent.collisionEvents["collision"] = function( Obj, direction, force, distance, canCollide ) {
        
        if (Parent.collisionActive && canCollide) {
            Parent.position = Vector2.add(
                Parent.position,
                // +
                Vector2.multiply(
                    direction,
                    // *
                    distance * force
                )
            );
        }
    }
    
    
    return true;
}


function updateCollision( Obj1, DeltaTime ) {
    
    if (Obj1 && !Obj1.anchored) {
        for (var grid in Obj1.oldGrids) {
            for (var Obj2ID in CollisionGrid.grid[ grid ]) {

                var Obj2 = Obj1.stage.allChilds[ Obj2ID ];

                if (Obj2 == undefined)
                    delete CollisionGrid.grid[ grid ][ Obj2ID ];
                
                else {

                    if (Obj1.ID != Obj2ID && Obj2.extends.collision != undefined) {

                        if (CheckCollision(Obj1, Obj2) && !Obj2.anchored)
                            CheckCollision(Obj2, Obj1);
                    }
                }
            }
        }
    }
}




function CheckCollision( Obj1, Obj2 ) {
    
    
    
    //Check for collision type
    if (Obj1.colliderType == Enum.colliderType.circle && Obj2.colliderType == Enum.colliderType.circle) {
        
        var collisionRadius = (Obj1.hitbox.x + Obj2.hitbox.x) * 0.5;

        
        //Check collision
        if (Vector2.magnitude(Obj1.position, Obj2.position) < collisionRadius) {
            var direction = Vector2.unit(Vector2.subtract(Obj1.position, Obj2.position));
            
            
            
            
            var Obj1Velocity = Vector2.magnitude(Obj1.velocity);
            var Obj2Velocity = Vector2.magnitude(Obj2.velocity);
            if (Obj1Velocity < 1) Obj1Velocity = 1;
            if (Obj2Velocity < 1) Obj2Velocity = 1;
            
            var force;
            if (Obj1.anchored)
                force = 0;
            else if (Obj2.anchored)
                force = 1;
            else
                force = Math.min((Obj2.mass * Obj1Velocity) / (Obj1.mass * Vector2.magnitude(Obj1.velocity)), 1);
            
            
            
            var canCollide = ( !Obj1.ignoreObjectIDs[Obj2.ID]             
                     && !Obj2.ignoreObjectIDs[Obj1.ID]           
                     && !Obj1.ignoreObjectType[Obj2.ClassType]   
                     && !Obj2.ignoreObjectType[Obj1.ClassType] );
            
            
            
            for (i in Obj1.collisionEvents)
                Obj1.collisionEvents[i](
                    Obj2,           // The object with collision
                    direction,      // Direction away from the object
                    force,          // Force on the ojbect
                    
                                    // Distance inside the object \\
                    ((Vector2.magnitude(Obj1.position, Obj2.position) / collisionRadius) * -1 + 1) * collisionRadius,
                    
                    canCollide      // Can Collide?
                );
            for (i in Obj2.collisionEvents)
                Obj2.collisionEvents[i](
                    Obj2,           // The object with collision
                    direction,      // Direction away from the object
                    -force + 1,     // Force on the ojbect
                    
                                    // Distance inside the object \\
                    ((Vector2.magnitude(Obj2.position, Obj1.position) / collisionRadius) * -1 + 1) * collisionRadius,
                    
                    canCollide      // Can Collide?
                );
            
            
            
            return true;
        }
    }
    else if (Obj1.colliderType == Enum.colliderType.box || Obj2.colliderType == Enum.colliderType.box) {
        
        
        //Check collision
        if ((Obj1.position.x + Obj1.hitbox.x*.5 > Obj2.position.x - Obj2.hitbox.x*.5 &&
             Obj1.position.x - Obj1.hitbox.x*.5 < Obj2.position.x + Obj2.hitbox.x*.5)
        &&  (Obj1.position.y + Obj1.hitbox.y*.5 > Obj2.position.y - Obj2.hitbox.y*.5 &&
             Obj1.position.y - Obj1.hitbox.y*.5 < Obj2.position.y + Obj2.hitbox.y*.5)) {
            
            
            
            var Obj1CounterVelocity = (Obj1.velocity ? Vector2.multiply(Obj1.velocity, RENDERSETTINGS.deltaTime) : Vector2.new());
            var Obj2CounterVelocity = (Obj2.velocity ? Vector2.multiply(Obj2.velocity, RENDERSETTINGS.deltaTime) : Vector2.new());
            var edges = {
                [((Obj1.position.y - Obj1CounterVelocity.y - Obj1.hitbox.y*.5) - (Obj2.position.y - Obj2CounterVelocity.y + Obj2.hitbox.y*.5))]: "down",
                [((Obj1.position.y - Obj1CounterVelocity.y + Obj1.hitbox.y*.5) - (Obj2.position.y - Obj2CounterVelocity.y - Obj2.hitbox.y*.5))]: "up",
                [((Obj1.position.x - Obj1CounterVelocity.x - Obj1.hitbox.x*.5) - (Obj2.position.x - Obj2CounterVelocity.x + Obj2.hitbox.x*.5))]: "left",
                [((Obj1.position.x - Obj1CounterVelocity.x + Obj1.hitbox.x*.5) - (Obj2.position.x - Obj2CounterVelocity.x - Obj2.hitbox.x*.5))]: "right",
            }
            
            
            
            var direction = Infinity;
            for (var i in edges) {
                if (Math.abs(i) < Math.abs(direction))
                    direction = i;
            }
            
            
            
            var distance = {
                down: Math.abs((Obj1.position.y - Obj1.hitbox.y*.5) - (Obj2.position.y + Obj2.hitbox.y*.5)),
                up: Math.abs((Obj1.position.y + Obj1.hitbox.y*.5) - (Obj2.position.y - Obj2.hitbox.y*.5)),
                left: Math.abs((Obj1.position.x - Obj1.hitbox.x*.5) - (Obj2.position.x + Obj2.hitbox.x*.5)),
                right: Math.abs((Obj1.position.x + Obj1.hitbox.x*.5) - (Obj2.position.x - Obj2.hitbox.x*.5))
            }
            
            
            
            var Obj1Velocity = Vector2.magnitude(Obj1.velocity);
            var Obj2Velocity = Vector2.magnitude(Obj2.velocity);
            if (Obj1Velocity < 1) Obj1Velocity = 1;
            if (Obj2Velocity < 1) Obj2Velocity = 1;

            var force;
            if (Obj1.anchored)
                force = 0;
            else if (Obj2.anchored)
                force = 1;
            else
                force = Math.min((Obj2.mass * Obj1Velocity) / (Obj1.mass * Vector2.magnitude(Obj1.velocity)), 1);
            
            
            
            var canCollide = ( !Obj1.ignoreObjectIDs[Obj2.ID]             
                     && !Obj2.ignoreObjectIDs[Obj1.ID]           
                     && !Obj1.ignoreObjectType[Obj2.ClassType]   
                     && !Obj2.ignoreObjectType[Obj1.ClassType] );
            
            
            
            for (i in Obj1.collisionEvents)
                Obj1.collisionEvents[i](
                    Obj2,                                       // The object with collision
                    Vector2.directions[ edges[ direction ] ],   // Direction away from the object
                    force,                                      // Force on the ojbect
                    distance[ edges[ direction ]],              // Distance inside the object
                    canCollide                                  // Can Collide?
                );
            for (i in Obj2.collisionEvents)
                Obj2.collisionEvents[i](
                    Obj1,                                                   // The object with collision
                    Vector2.multiply( Vector2.directions[ edges[ direction ] ], -1 ),   // Direction away from the object
                    -force + 1,                                      // Force on the ojbect
                    distance[ edges[ direction ]],              // Distance inside the object
                    canCollide                                            // Can Collide?
                );
            
            
            
            return true;
        }
    }
    
    return false;
}