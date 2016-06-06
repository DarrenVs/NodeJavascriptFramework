CollisionLoop = {};

var CollisionGrid = {
    gridSize: Vector2.new(100, 100),
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
    Parent.collisionStay = Parent.collisionStay || {};
    Parent.collisionEnter = Parent.collisionEnter || {};
    Parent.collisionExit = Parent.collisionExit || {};
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
            
            CollisionLoop[Parent.ID] = true;
        }
    })
    Parent.__defineGetter__('position', function(val) {
        return Parent.Position;
    })
    Parent.position = Parent.position;
    
    
    
    Parent.__defineGetter__('collisionDirection', function() {
        return Vector2.unit(Vector2.divide(Parent.CollisionDirection, Parent.collisionCount));
    })
    Parent.__defineSetter__('collisionDirection', function(val) {
        Parent.CollisionDirection = val;
    })
    Parent.__defineGetter__('collisionDepth', function() {
        return Parent.CollisionDepth / Parent.collisionCount;
    })
    Parent.__defineSetter__('collisionDepth', function(val) {
        Parent.CollisionDepth = val;
    })
    
    
    Parent.collisions = {};
    Parent.collisionCount = 0;
    Parent.collisionDirection = Vector2.new();
    Parent.collisionDepth = 0;
    Parent.collisionUpdates = 0;
    
    
    Parent.collisionStay["collision"] = function( Obj, direction, force, distance, canCollide ) {
        
        if (!Parent.anchored && Parent.collisionActive && canCollide) {
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
    Parent.collisionEnter["collision"] = function( Obj, direction, force, distance, canCollide ) {
        
        //console.log("Enter");
    }
    Parent.collisionExit["collision"] = function( Obj, direction, force, distance, canCollide ) {
        
        //console.log("Exit");
    }
    
    
    return true;
}


function updateCollision( Obj1, deltaTime ) {
    
    if (Obj1) {
        
        for (var grid in Obj1.oldGrids) {
            for (var Obj2ID in CollisionGrid.grid[ grid ]) {

                var Obj2 = Obj1.stage.allChilds[ Obj2ID ];

                if (Obj2 == undefined)
                    delete CollisionGrid.grid[ grid ][ Obj2ID ];
                
                else {

                    if (Obj1.ID != Obj2ID && Obj2.extends.collision != undefined) {

                        if (CheckCollision(Obj1, Obj2, deltaTime))
                            CheckCollision(Obj2, Obj1, deltaTime);
                    }
                }
            }
        }
        
        Obj1.collisionUpdates = 0;
        for (var Obj2ID in Obj1.collisions) {
            
            if (Obj1.collisions[Obj2ID].lifeTime == 10) {
                console.log("Enter");

                for (i in Obj1.collisionEnter)
                    Obj1.collisionEnter[i](
                        Obj1.collisions[Obj2ID].Obj,        // The object with collision
                        Obj1.collisions[Obj2ID].direction,  // Direction away from the object
                        Obj1.collisions[Obj2ID].force,      // Force on the ojbect
                        Obj1.collisions[Obj2ID].distance,   // Distance inside the object
                        Obj1.collisions[Obj2ID].canCollide  // Can Collide?
                    );
            }
            
            
            if (Obj1.collisions[Obj2ID].lifeTime == 10 || Obj1.collisions[Obj2ID].lifeTime == 5) {
                console.log("Stay");
                for (i in Obj1.collisionStay)
                    Obj1.collisionStay[i](
                        Obj1.collisions[Obj2ID].Obj,        // The object with collision
                        Obj1.collisions[Obj2ID].direction,  // Direction away from the object
                        Obj1.collisions[Obj2ID].force,      // Force on the ojbect
                        Obj1.collisions[Obj2ID].distance,   // Distance inside the object
                        Obj1.collisions[Obj2ID].canCollide  // Can Collide?
                    );
            }
            
            
            if (Obj1.collisions[Obj2ID].lifeTime-- <= 0) {
                console.log("Exit");

                for (i in Obj1.collisionExit)
                    Obj1.collisionExit[i](
                        Obj1.collisions[Obj2ID].Obj,        // The object with collision
                        Obj1.collisions[Obj2ID].direction,  // Direction away from the object
                        Obj1.collisions[Obj2ID].force,      // Force on the ojbect
                        Obj1.collisions[Obj2ID].distance,   // Distance inside the object
                        Obj1.collisions[Obj2ID].canCollide  // Can Collide?
                    );
                
                Obj1.collisionDirection = Vector2.subtract(Obj1.collisionDirection, Obj1.collisions[Obj2ID].direction);
                Obj1.collisionDepth -= Obj1.collisions[Obj2ID].distance;
                Obj1.collisionCount--;
                delete Obj1.collisions[Obj2ID];
            }
            
            Obj1.collisionUpdates++;
        }
    }
}




function CheckCollision( Obj1, Obj2, deltaTime ) {
    
    
    
    //Check for collision type
    if (Obj1.colliderType == Enum.colliderType.circle && Obj2.colliderType == Enum.colliderType.circle) {
        
        var collisionRadius = (Obj1.hitbox.x + Obj2.hitbox.x) * 0.5;

        
        //Check collision
        if (Vector2.magnitude(Obj1.globalPosition, Obj2.globalPosition) < collisionRadius) {
            var direction = Vector2.unit(Vector2.subtract(Obj1.globalPosition, Obj2.globalPosition));
            var distance = ((Vector2.magnitude(Obj1.globalPosition, Obj2.globalPosition) / collisionRadius) * -1 + 1) * collisionRadius;
            
            
            
            
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
            
            
            
            if (Obj1.collisions[Obj2.ID]) {
                Obj1.collisionDirection = Vector2.subtract(Obj1.collisionDirection, Obj1.collisions[Obj2.ID].direction);
                Obj1.collisionDepth -= Obj1.collisions[Obj2.ID].distance;
            } else
                Obj1.collisionCount++;
            Obj1.collisionDirection = Vector2.add(Obj1.collisionDirection, direction);
            Obj1.collisionDepth += distance;
            
            Obj1.collisions[Obj2.ID] = {
                lifeTime: Obj1.collisions[Obj2.ID] == undefined ? 10 : (Obj1.collisions[Obj2.ID].lifeTime > 5 ? Obj1.collisions[Obj2.ID].lifeTime : 5),
                Obj: Obj2,
                direction: direction,
                distance: distance + -.1,
                force: force,
                canCollide: canCollide,
            };
            
            
            
            if (Obj2.collisions[Obj1.ID]) {
                Obj2.collisionDirection = Vector2.subtract(Obj1.collisionDirection, Obj2.collisions[Obj1.ID].direction);
                Obj2.collisionDepth -= Obj2.collisions[Obj1.ID].distance;
            } else
                Obj2.collisionCount++;
            Obj2.collisionDirection = Vector2.add(Obj1.collisionDirection, Vector2.multiply( direction, -1 ));
            Obj2.collisionDepth += distance;
            
            Obj2.collisions[Obj1.ID] = {
                lifeTime: Obj2.collisions[Obj1.ID] == undefined ? 10 : (Obj2.collisions[Obj1.ID].lifeTime > 5 ? Obj2.collisions[Obj1.ID].lifeTime : 5),
                Obj: Obj1,
                direction: Vector2.multiply( direction, -1 ),
                distance: distance + -.1,
                force: -force + 1,
                canCollide: canCollide,
            };
            
            
            
            return true;
        }
    }
    else if (Obj1.colliderType == Enum.colliderType.box || Obj2.colliderType == Enum.colliderType.box) {
        
        
        //Check collision
        if ((Obj1.globalPosition.x + Obj1.hitbox.x*.5 > Obj2.globalPosition.x - Obj2.hitbox.x*.5 &&
             Obj1.globalPosition.x - Obj1.hitbox.x*.5 < Obj2.globalPosition.x + Obj2.hitbox.x*.5)
        &&  (Obj1.globalPosition.y + Obj1.hitbox.y*.5 > Obj2.globalPosition.y - Obj2.hitbox.y*.5 &&
             Obj1.globalPosition.y - Obj1.hitbox.y*.5 < Obj2.globalPosition.y + Obj2.hitbox.y*.5)) {
            
            
            
            var Obj1CounterVelocity = (Obj1.velocity ? Vector2.multiply(Obj1.velocity, deltaTime) : Vector2.new());
            var Obj2CounterVelocity = (Obj2.velocity ? Vector2.multiply(Obj2.velocity, deltaTime) : Vector2.new());
            var edges = {
                [((Obj1.globalPosition.y - Obj1CounterVelocity.y - Obj1.hitbox.y*.5) - (Obj2.globalPosition.y - Obj2CounterVelocity.y + Obj2.hitbox.y*.5))]: "down",
                [((Obj1.globalPosition.y - Obj1CounterVelocity.y + Obj1.hitbox.y*.5) - (Obj2.globalPosition.y - Obj2CounterVelocity.y - Obj2.hitbox.y*.5))]: "up",
                [((Obj1.globalPosition.x - Obj1CounterVelocity.x - Obj1.hitbox.x*.5) - (Obj2.globalPosition.x - Obj2CounterVelocity.x + Obj2.hitbox.x*.5))]: "left",
                [((Obj1.globalPosition.x - Obj1CounterVelocity.x + Obj1.hitbox.x*.5) - (Obj2.globalPosition.x - Obj2CounterVelocity.x - Obj2.hitbox.x*.5))]: "right",
            }
            
            
            
            var direction = Infinity;
            for (var i in edges) {
                if (Math.abs(i) < Math.abs(direction))
                    direction = i;
            }
            
            
            
            var distance = {
                down: Math.abs((Obj1.globalPosition.y - Obj1.hitbox.y*.5) - (Obj2.globalPosition.y + Obj2.hitbox.y*.5)),
                up: Math.abs((Obj1.globalPosition.y + Obj1.hitbox.y*.5) - (Obj2.globalPosition.y - Obj2.hitbox.y*.5)),
                left: Math.abs((Obj1.globalPosition.x - Obj1.hitbox.x*.5) - (Obj2.globalPosition.x + Obj2.hitbox.x*.5)),
                right: Math.abs((Obj1.globalPosition.x + Obj1.hitbox.x*.5) - (Obj2.globalPosition.x - Obj2.hitbox.x*.5))
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
            
            
            
            if (Obj1.collisions[Obj2.ID]) {
                Obj1.collisionDirection = Vector2.subtract(Obj1.collisionDirection, Obj1.collisions[Obj2.ID].direction);
                Obj1.collisionDepth -= Obj1.collisions[Obj2.ID].distance;
            } else
                Obj1.collisionCount++;
            Obj1.collisionDirection = Vector2.add(Obj1.collisionDirection, Vector2.directions[ edges[ direction ] ]);
            Obj1.collisionDepth += distance[ edges[ direction ]];
            
            Obj1.collisions[Obj2.ID] = {
                lifeTime: Obj1.collisions[Obj2.ID] == undefined ? 10 : (Obj1.collisions[Obj2.ID].lifeTime > 5 ? Obj1.collisions[Obj2.ID].lifeTime : 5),
                Obj: Obj2,
                direction: Vector2.directions[ edges[ direction ] ],
                distance: distance[ edges[ direction ]] + -.1,
                force: force,
                canCollide: canCollide,
            };
            
            
            
            if (Obj2.collisions[Obj1.ID]) {
                Obj2.collisionDirection = Vector2.subtract(Obj2.collisionDirection, Obj2.collisions[Obj1.ID].direction);
                Obj2.collisionDepth -= Obj2.collisions[Obj1.ID].distance;
            } else
                Obj2.collisionCount++;
            Obj2.collisionDirection = Vector2.add(Obj2.collisionDirection, Vector2.multiply( Vector2.directions[ edges[ direction ] ], -1 ));
            Obj2.collisionDepth += distance[ edges[ direction ]];
            
            Obj2.collisions[Obj1.ID] = {
                lifeTime: Obj2.collisions[Obj1.ID] == undefined ? 10 : (Obj2.collisions[Obj1.ID].lifeTime > 5 ? Obj2.collisions[Obj1.ID].lifeTime : 5),
                Obj: Obj1,
                direction: Vector2.multiply( Vector2.directions[ edges[ direction ] ], -1 ),
                distance: distance[ edges[ direction ]] + -.1,
                force: -force + 1,
                canCollide: canCollide,
            };
            
            
            return true;
        }
    }
    
    return false;
}