function updateObjectsGrid( Obj ) {
    
    if (Obj.stage != undefined) {
        var newGrids = Obj.stage.CollisionGrid.new( Obj );

        for (var oldGrid in Obj.oldGrids) {

            if (newGrids[oldGrid] == undefined)
                delete Obj.stage.CollisionGrid.grid[oldGrid][Obj.ID];
        }

        Obj.oldGrids = newGrids;

        Obj.stage.CollisionLoop[Obj.ID] = Obj;

        for (var i in Obj.childs) {

            if (Obj.childs[i].extends.collision)
                Obj.childs[i].position = Obj.childs[i].position;
        }
    }
}


//Sub Class
function Collision(Parent) {
    var Parent = Parent;
    var self = this;
    
    
    Parent.canCollide = true;
    Parent.colliderType = Parent.colliderType || Enum.colliderType.box;
    Parent.hitbox = Parent.hitbox || Vector2.new(50, 50);
    Parent.mass = Parent.mass || 1;
    Parent.ignoreObjectIDs = Parent.ignoreObjectIDs || {};
    Parent.ignoreObjectType = Parent.ignoreObjectType || {};
    Parent.collisionStay = Parent.collisionStay || {};
    Parent.collisionEnter = Parent.collisionEnter || {};
    Parent.collisionExit = Parent.collisionExit || {};
    Parent.collisionActive = Parent.collisionActive ||true;
    
    Parent.oldGrids = {};
    
    
    
    Parent.Position = Vector2.new();
    Parent.Position.X = Parent.position.x;
    Parent.Position.Y = Parent.position.y;
    
    
    Parent.__defineSetter__('position', function(val) {
        
        if (val != undefined && val.x != undefined && val.y != undefined && val.x != NaN && val.y != NaN) {
            Parent.Position.X = val.x;
            Parent.Position.Y = val.y;
            
            updateObjectsGrid( Parent );
        }
    })
    Parent.__defineGetter__('position', () => {
        return Parent.Position;
    })
    
    
    
    Parent.Position.__defineSetter__('x', (val) => {
        
        if (val != undefined && val != NaN) {
            Parent.Position.X = val;
            
            updateObjectsGrid( Parent );
        }
    })
    Parent.Position.__defineGetter__('x', () => {
        return Parent.Position.X;
    })
    
    
    
    Parent.Position.__defineSetter__('y', (val) => {
        
        if (val != undefined && val != NaN) {
            Parent.Position.Y = val;
            
            updateObjectsGrid( Parent );
        }
    })
    Parent.Position.__defineGetter__('y', () => {
        return Parent.Position.Y;
    })
    
    
    Parent.position = Parent.position;
    
    
    
    
    
    Parent.__defineGetter__('collisionDirection', () => {
        return Vector2.unit(Vector2.divide(Parent.CollisionDirection, Parent.collisionCount));
    })
    Parent.__defineSetter__('collisionDirection', (val) => {
        Parent.CollisionDirection = val;
    })
    Parent.__defineGetter__('collisionDepth', () => {
        return Parent.CollisionDepth / Parent.collisionCount;
    })
    Parent.__defineSetter__('collisionDepth', (val) => {
        Parent.CollisionDepth = val;
    })
    
    
    Parent.collisions = {};
    Parent.collisionCount = 0;
    Parent.collisionDirection = Vector2.new();
    Parent.lastCollisionDirection = Vector2.new();
    Parent.priorityCollisionDirection = Vector2.new();
    Parent.priorityCollisionDepth = 0;
    Parent.collisionDepth = 0;
    Parent.collisionUpdates = 0;
    
    
    Parent.collisionStay["collision"] = function( Obj, direction, force, distance, canCollide ) {
        
        if (!Parent.anchored && Parent.collisionActive && Obj.collisionActive && canCollide && CheckCollision(Parent, Obj, RENDERSETTINGS.deltaTime)) {
            
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


function updateCollision( Obj1, deltaTime ) {
    
    if (Obj1 && Obj1.stage != undefined) {
        
        Obj1.stage.testedObjects[ Obj1.ID ] = true;
        
        Obj1.priorityCollisionDirection = Vector2.new();
        Obj1.priorityCollisionDepth = 0;
        
        for (var grid in Obj1.oldGrids) {
            for (var Obj2ID in Obj1.stage.CollisionGrid.grid[ grid ]) {

                var Obj2 = Obj1.stage.allChilds[ Obj2ID ];

                if (Obj2 == undefined)
                    delete Obj1.stage.CollisionGrid.grid[ grid ][ Obj2ID ];
                
                else {
                    if (Obj1.ID != Obj2ID && Obj2.extends.collision != undefined) {

                        if (CheckCollision(Obj1, Obj2, deltaTime) && !Obj1.stage.testedObjects[ Obj2.ID ]) {
                            //CheckCollision(Obj1, Obj2, deltaTime);
                            updateCollision(Obj2, deltaTime);
                        }
                    }
                }
            }
        }
        
        Obj1.collisionUpdates = 0;
        for (var Obj2ID in Obj1.collisions) {
            
            if (Obj1.collisions[Obj2ID].Obj.anchored == false)
                Obj1.stage.CollisionLoop[ Obj1.ID ] = Obj1;
            
            if (Obj1.collisions[Obj2ID].lifeTime == 3) {

                 for (i in Obj1.collisionEnter)
                     Obj1.collisionEnter[i](
                         Obj1.collisions[Obj2ID].Obj, // The object with collision
                         Obj1.collisions[Obj2ID].direction, // Direction away from the object
                         Obj1.collisions[Obj2ID].force, // Force on the ojbect
                         Obj1.collisions[Obj2ID].distance, // Distance inside the object
                         Obj1.collisions[Obj2ID].canCollide, // Can Collide?
                         Obj1.collisions[Obj2ID].collisionFrames // Amount of frames with collision
                     );
             }


             if (Obj1.collisions[Obj2ID].lifeTime >= 2) {

                 for (i in Obj1.collisionStay)
                     Obj1.collisionStay[i](
                         Obj1.collisions[Obj2ID].Obj, // The object with collision
                         Obj1.collisions[Obj2ID].direction, // Direction away from the object
                         Obj1.collisions[Obj2ID].force, // Force on the ojbect
                         Obj1.collisions[Obj2ID].distance, // Distance inside the object
                         Obj1.collisions[Obj2ID].canCollide, // Can Collide?
                         Obj1.collisions[Obj2ID].collisionFrames // Amount of frames with collision
                     );
             }


             if (Obj1.collisions[Obj2ID].Obj.Parent == undefined || Obj1.collisions[Obj2ID].lifeTime-- <= 0 && CheckCollision( Obj1, Obj1.collisions[Obj2ID].Obj, deltaTime ) == false) {

                 for (i in Obj1.collisionExit)
                     Obj1.collisionExit[i](
                         Obj1.collisions[Obj2ID].Obj, // The object with collision
                         Obj1.collisions[Obj2ID].direction, // Direction away from the object
                         Obj1.collisions[Obj2ID].force, // Force on the ojbect
                         Obj1.collisions[Obj2ID].distance, // Distance inside the object
                         Obj1.collisions[Obj2ID].canCollide, // Can Collide?
                         Obj1.collisions[Obj2ID].collisionFrames // Amount of frames with collision
                     );

                 Obj1.collisionDirection = Vector2.subtract(Obj1.CollisionDirection, Obj1.collisions[Obj2ID].direction);
                 Obj1.CollisionDepth -= Obj1.collisions[Obj2ID].distance;
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
                Obj1.CollisionDirection = Vector2.subtract(Obj1.CollisionDirection, Obj1.collisions[Obj2.ID].direction);
                Obj1.CollisionDepth -= Obj1.collisions[Obj2.ID].distance;
            } else
                Obj1.collisionCount++;
            Obj1.CollisionDirection = Vector2.add(Obj1.CollisionDirection, direction);
            Obj1.CollisionDepth += distance;
            Obj1.lastCollisionDirection = direction;
            
            Obj1.collisions[Obj2.ID] = {
                collisionFrames: Obj1.collisions[Obj2.ID] == undefined ? 1 : Obj1.collisions[Obj2.ID].collisionFrames + 1,
                lifeTime: Obj1.collisions[Obj2.ID] == undefined ? 3 : (Obj1.collisions[Obj2.ID].lifeTime > 2 ? Obj1.collisions[Obj2.ID].lifeTime : 2),
                Obj: Obj2,
                direction: direction,
                distance: Math.ceil(distance * 100) / 100,
                force: force,
                canCollide: canCollide,
            };
            
            if (Obj1.collisions[Obj2.ID].distance > Obj1.priorityCollisionDepth) {
                Obj1.priorityCollisionDepth = Obj1.collisions[Obj2.ID].distance;
                Obj1.priorityCollisionDirection = Obj1.collisions[Obj2.ID].direction;
            }
            
            
            
            if (Obj2.collisions[Obj1.ID]) {
                Obj2.CollisionDirection = Vector2.subtract(Obj1.CollisionDirection, Obj2.collisions[Obj1.ID].direction);
                Obj2.CollisionDepth -= Obj2.collisions[Obj1.ID].distance;
            } else
                Obj2.collisionCount++;
            Obj2.CollisionDirection = Vector2.add(Obj1.CollisionDirection, Vector2.multiply( direction, -1 ));
            Obj2.CollisionDepth += distance;
            Obj1.lastCollisionDirection = Vector2.multiply( direction, -1 );
            
            Obj2.collisions[Obj1.ID] = {
                collisionFrames: Obj2.collisions[Obj1.ID] == undefined ? 1 : Obj2.collisions[Obj1.ID].collisionFrames + 1,
                lifeTime: Obj2.collisions[Obj1.ID] == undefined ? 3 : (Obj2.collisions[Obj1.ID].lifeTime > 2 ? Obj2.collisions[Obj1.ID].lifeTime : 2),
                Obj: Obj1,
                direction: Vector2.multiply( direction, -1 ),
                distance: Math.ceil(distance * 100) / 100,
                force: -force + 1,
                canCollide: canCollide,
            };
            
            if (Obj2.collisions[Obj1.ID].distance > Obj2.priorityCollisionDepth) {
                Obj2.priorityCollisionDepth = Obj2.collisions[Obj1.ID].distance;
                Obj2.priorityCollisionDirection = Obj2.collisions[Obj1.ID].direction;
            }
            //CollisionLoop[Obj2.ID] = Obj2;
            
            
            
            return true;
        }
    }
    else if (Obj1.colliderType == Enum.colliderType.box || Obj2.colliderType == Enum.colliderType.box) {
        
        
        //Check collision
        if ((Obj1.globalPosition.x + Obj1.hitbox.x*.5 > Obj2.globalPosition.x - Obj2.hitbox.x*.5 &&
             Obj1.globalPosition.x - Obj1.hitbox.x*.5 < Obj2.globalPosition.x + Obj2.hitbox.x*.5)
        &&  (Obj1.globalPosition.y + Obj1.hitbox.y*.5 > Obj2.globalPosition.y - Obj2.hitbox.y*.5 &&
             Obj1.globalPosition.y - Obj1.hitbox.y*.5 < Obj2.globalPosition.y + Obj2.hitbox.y*.5)) {
            
            
            
            var Obj1CounterVelocity = Vector2.multiply((Obj1.velocity ? Obj1.velocity : Vector2.new()), deltaTime);
            var Obj2CounterVelocity = Vector2.multiply((Obj2.velocity ? Obj2.velocity : Vector2.new()), deltaTime);
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
                     && !Obj2.ignoreObjectType[Obj1.ClassType]
                     && Obj1.canCollide
                     && Obj2.canCollide );
            
            
            
            if (Obj1.collisions[Obj2.ID]) {
                Obj1.CollisionDirection = Vector2.subtract(Obj1.CollisionDirection, Obj1.collisions[Obj2.ID].direction);
                Obj1.CollisionDepth -= Obj1.collisions[Obj2.ID].distance;
            } else
                Obj1.collisionCount++;
            Obj1.CollisionDirection = Vector2.add(Obj1.CollisionDirection, Vector2.directions[ edges[ direction ] ]);
            Obj1.CollisionDepth += distance[ edges[ direction ]];
            Obj1.lastCollisionDirection = Vector2.directions[ edges[ direction ] ];
            
            Obj1.collisions[Obj2.ID] = {
                collisionFrames: Obj1.collisions[Obj2.ID] == undefined ? 1 : Obj1.collisions[Obj2.ID].collisionFrames + 1,
                lifeTime: Obj1.collisions[Obj2.ID] == undefined ? 3 : (Obj1.collisions[Obj2.ID].lifeTime > 2 ? Obj1.collisions[Obj2.ID].lifeTime : 2),
                Obj: Obj2,
                direction: Vector2.directions[ edges[ direction ] ],
                distance: Math.ceil(distance[ edges[ direction ]] * 100) / 100,
                force: force,
                canCollide: canCollide,
            };
            
            if (Obj1.collisions[Obj2.ID].distance > Obj1.priorityCollisionDepth) {
                Obj1.priorityCollisionDepth = Obj1.collisions[Obj2.ID].distance;
                Obj1.priorityCollisionDirection = Obj1.collisions[Obj2.ID].direction;
            }
            
            
            
            if (Obj2.collisions[Obj1.ID]) {
                Obj2.CollisionDirection = Vector2.subtract(Obj2.CollisionDirection, Obj2.collisions[Obj1.ID].direction);
                Obj2.CollisionDepth -= Obj2.collisions[Obj1.ID].distance;
            } else
                Obj2.collisionCount++;
            Obj2.CollisionDirection = Vector2.add(Obj2.CollisionDirection, Vector2.multiply( Vector2.directions[ edges[ direction ] ], -1 ));
            Obj2.CollisionDepth += distance[ edges[ direction ]];
            Obj1.lastCollisionDirection = Vector2.multiply( Vector2.directions[ edges[ direction ] ], -1 );
            
            Obj2.collisions[Obj1.ID] = {
                collisionFrames: Obj2.collisions[Obj1.ID] == undefined ? 1 : Obj2.collisions[Obj1.ID].collisionFrames + 1,
                lifeTime: Obj2.collisions[Obj1.ID] == undefined ? 3 : (Obj2.collisions[Obj1.ID].lifeTime > 2 ? Obj2.collisions[Obj1.ID].lifeTime : 2),
                Obj: Obj1,
                direction: Vector2.multiply( Vector2.directions[ edges[ direction ] ], -1 ),
                distance: Math.ceil(distance[ edges[ direction ]] * 100) / 100,
                force: -force + 1,
                canCollide: canCollide,
            };
            
            if (Obj2.collisions[Obj1.ID].distance > Obj2.priorityCollisionDepth) {
                Obj2.priorityCollisionDepth = Obj2.collisions[Obj1.ID].distance;
                Obj2.priorityCollisionDirection = Obj2.collisions[Obj1.ID].direction;
            }
            //CollisionLoop[Obj2.ID] = Obj2;
            
            
            return true;
        }
    }
    
    return false;
}