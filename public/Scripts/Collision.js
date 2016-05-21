var CollisionGrid = {
    gridSize: Vector2.new(100, 100),
    grid:{
        
    },
    
    
    new:function( pos, radius, Obj ) {
        
        var Grids = {};
        
        for (var index in Vector2.directions) {
            
            var gridLocation = Vector2.new(
                Math.floor((pos.x + Vector2.directions[index].x * Obj.physicalAppearanceSize) / CollisionGrid.gridSize.x) * CollisionGrid.gridSize.x,
                Math.floor((pos.y + Vector2.directions[index].y * Obj.physicalAppearanceSize) / CollisionGrid.gridSize.y) * CollisionGrid.gridSize.y
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
}


//Sub Class
function Collision(Parent) {
    var Parent = Parent;
    var self = this;
    
    Parent.colliderType = Parent.colliderType || Enum.colliderType.circle;
    Parent.physicalAppearance = {}; //for the physics grid (NOT YET READY)
    Parent.physicalAppearanceSize = Parent.physicalAppearanceSize || 50; //radius of the object
    Parent.mass = Parent.mass || 1;
    Parent.ignoreObjectIDs = Parent.ignoreObjectIDs || {};
    Parent.ignoreObjectType = Parent.ignoreObjectType || {};
    Parent.collisionEvents = Parent.collisionEvents || {};
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
        }
    })
    Parent.__defineGetter__('position', function(val) {
        return Parent.Position;
    })
    Parent.position = Parent.position;
    
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
    var collision = false;
    
    if (Obj1.ignoreObjectIDs[Obj2.ID] || Obj2.ignoreObjectIDs[Obj1.ID]
       ||Obj1.ignoreObjectType[Obj2.ClassType] || Obj2.ignoreObjectType[Obj1.ClassType]) return false;
    if (Obj1.colliderType = Enum.colliderType.circle) {
        
        var collisionRadius = (Obj1.physicalAppearanceSize*.5 + Obj2.physicalAppearanceSize*.5);

        //console.log(Vector2.magnitude(Parent.position, Obj.position) + " < " + Parent.physicalAppearanceSize*.5 + Obj.physicalAppearanceSize*.5);
        if (Vector2.magnitude(Obj1.position, Obj2.position) < collisionRadius) {
            
            
            var Obj1Velocity = Vector2.magnitude(Obj1.velocity)
            var Obj2Velocity = Vector2.magnitude(Obj2.velocity)
            if (Obj1Velocity < 1) Obj1Velocity = 1;
            if (Obj2Velocity < 1) Obj2Velocity = 1;
            
            var force = Math.min((Obj2.mass * Obj1Velocity) / (Obj1.mass * Vector2.magnitude(Obj1.velocity)), 1);
            
            Obj1.position = Vector2.add(
                Obj1.position,
                // +
                Vector2.multiply(
                    Vector2.unit(Vector2.subtract(Obj1.position, Obj2.position)),
                    // *
                    ((Vector2.magnitude(Obj1.position, Obj2.position) / collisionRadius) * -force + force) * collisionRadius
                )
            );
            
            
            ///Obj1.velocity = Vector2.multiply(Obj2.velocity, force)
            
            collision = true;
        }
    }
    
    if (collision) {
        for (i in Obj1.collisionEvents)
            Obj1.collisionEvents[i](Obj2);
        for (i in Obj2.collisionEvents)
            Obj2.collisionEvents[i](Obj1);
    }
    
    return collision;
}