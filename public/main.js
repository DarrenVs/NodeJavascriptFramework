var canvas, ctx;
var RENDERSETTINGS = {
    lastTransformObject: null
    , renderDate: new Date().getTime()
    , renderTime: 0,
    deltaTime: 1/60
, }
var PHYSICSSETTINGS = {
    FPS: 1 / 60
    , physicsDate: new Date().getTime()
, }
var objectCount = 0;
var replicatedObjectCount = 0;
var socketio = io.connect(window.location.host);
var clientID = undefined;
var clientRoom = undefined;
var connectionList = {};

var Game = {
    
    addChild: function( name, Stage ) {
        if (Stage != undefined) {
            Stage.stageID = name;
            Game[name] = Stage;
        }
        
        return Stage;
    }
};


var events = events || {
    
    
    test: function(arguments) {
        
        console.log(arguments);
    },

    sendPickup: function(parameters) {
        PickupProperties.assignPickup(parameters.pickupKey, parameters.pickupID);
    },
    
    sendChunk: function(parameters) {
        ChunkProperties.spawnChunk(Enum.SpawnAbleChunks[parameters.chunkID], parameters.stageID);
    },  
};




function updateObject(Obj) {

    if (Obj.update) {
        for (i in Obj.update) {
            if (Obj.Parent)
                Obj.update[i]( Obj, RENDERSETTINGS.deltaTime );
        }
    }
    

    if (Obj.childs) {
        for (i in Obj.childs)
            updateObject(Obj.childs[i]);
    }

}
function updateDrawObject(Obj) {

    while (true) {
        lowwerObjectIndex = DrawLoop.indexOf(Obj) - 1;

        if (DrawLoop[lowwerObjectIndex] && DrawLoop[lowwerObjectIndex].zIndex > Obj.zIndex)
            DrawLoop.splice(lowwerObjectIndex, 2, Obj, DrawLoop[lowwerObjectIndex]);
        else break;
    }
}


window.addEventListener("load", function () {

    //  Index
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    Inputs();



    //Resize event
    (window.onresize = function() {
        
        console.log("resize");
        canvas.width = 600;
        canvas.height = 935;
    })();
    
    
    
    
    //Start the client
    if (clientID == undefined)
        socketio.emit("IDrequest_from_client");
    
    
    


    //  Values
    

    function drawFrame() {
        RENDERSETTINGS.renderTime = Math.min((new Date().getTime() - RENDERSETTINGS.renderDate) * 0.001, 10);
        RENDERSETTINGS.renderDate = new Date().getTime();
        
        RENDERSETTINGS.FPS = 1 / RENDERSETTINGS.renderTime;
        RENDERSETTINGS.frameCount++;
        
        
        //Clear canvas
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        
        //Update stageObjects
        for (var stageIndex in Game) {
            
            updateObject(Game[stageIndex]);
            RENDERSETTINGS.deltaTime = 1/60;//Math.min(RENDERSETTINGS.renderTime - i, 1/60);


            //Update Physics
            for (var ObjID in Game[stageIndex].PhysicsLoop) {
                
                delete Game[stageIndex].PhysicsLoop[ObjID];
                updatePhysics( Game[stageIndex].allChilds[ObjID], RENDERSETTINGS.deltaTime );
            }


            //Update Collisions
            Game[stageIndex].testedObjects = {};
            for (var ObjID in Game[stageIndex].CollisionLoop) {
                
                delete Game[stageIndex].CollisionLoop[ObjID];
                updateCollision( Game[stageIndex].allChilds[ObjID], RENDERSETTINGS.deltaTime );
            }


            //Draw Objects on canvas
            for (var ObjIndex in Game[stageIndex].DrawLoop) {
                if (Game[stageIndex].allChilds[Game[stageIndex].DrawLoop[ObjIndex]].DrawObject != undefined)
                    Game[stageIndex].allChilds[Game[stageIndex].DrawLoop[ObjIndex]].DrawObject.update();
            }
        }
        
        
        
        
        MOUSE_CLICK = {};
        INPUT_CLICK = {};
        
        window.requestAnimationFrame(drawFrame);
    }
    drawFrame();
    //window.setInterval(drawFrame, (1/30)*1000);
})






//Base Class
function Stage(properties) {

    //this.gravity = new Vector2.new(0, 9.8);
    this.gravity = Vector2.new();//new Vector2.new(450, 450);//canvas.width/2, canvas.height/2);
    this.gravityType = Enum.gravity.global;//Enum.gravity.worldPoint;
    
    this.airDensity = .01;

    var self = this;
    
    this.__defineGetter__('mousePosition', function(val) {
        return Vector2.subtract( MOUSE.Position, self.position );
    });

     this.getGlobalPos = function( Obj ) {
        var position = Vector2.new(Obj.position.x, Obj.position.y);
        
        if (Obj.Parent != undefined)
            position = Vector2.add( position, getPos(Obj.Parent))
            
        return position;
    }

    GameObject(this, properties);

    this.allChilds = {};

    this.stageID = this.stageID || Object.keys(Game).length;
    
    self.PhysicsLoop = {};
    
    self.CollisionLoop = {};
    self.testedObjects = {};

    self.DrawLoop = [];

    self.gridSize = Vector2.new(601, 201);
    self.CollisionGrid = {
        grid:{

        },



        new:function( Obj ) {

            var Grids = {};

            var min = Vector2.new(Infinity, Infinity);
            var max = Vector2.new(-Infinity, -Infinity);
            
            for (var index in Vector2.directions) {

                var gridLocation = Vector2.new(
                    Math.floor((Obj.globalPosition.x + Vector2.directions[index].x * Obj.hitbox.x) / self.gridSize.x) * self.gridSize.x,
                    Math.floor((Obj.globalPosition.y + Vector2.directions[index].y * Obj.hitbox.y) / self.gridSize.y) * self.gridSize.y
                );

                if (self.CollisionGrid.grid[gridLocation.x + "x" + gridLocation.y] == undefined)
                    self.CollisionGrid.grid[gridLocation.x + "x" + gridLocation.y] = {};

                if (Grids[gridLocation.x + "x" + gridLocation.y] == undefined)
                    Grids[gridLocation.x + "x" + gridLocation.y] = true;
                
                if (gridLocation.x < min.x)
                    min.x = gridLocation.x;
                if (gridLocation.y < min.y)
                    min.y = gridLocation.y;

                if (gridLocation.x > max.x)
                    max.x = gridLocation.x;
                if (gridLocation.y > max.y)
                    max.y = gridLocation.y;
            }
            
            
            var x = min.x
			for (var y = min.y; y <= max.y; y += self.gridSize.y) {
				
				if (self.CollisionGrid.grid[x + "x" + y] == undefined)
					self.CollisionGrid.grid[x + "x" + y] = {};
				
				if (self.CollisionGrid.grid[x + "x" + y][Obj.ID] == undefined)
					self.CollisionGrid.grid[x + "x" + y][Obj.ID] = true;
					self.CollisionGrid.grid[x + "x" + y][Obj.ID] = true;
				
				if (Grids[x + "x" + y] == undefined)
					Grids[x + "x" + y] = true;
			}
			
			var x = max.x
			for (var y = min.y; y <= max.y; y += self.gridSize.y) {
				
				if (self.CollisionGrid.grid[x + "x" + y] == undefined)
					self.CollisionGrid.grid[x + "x" + y] = {};
				
				if (self.CollisionGrid.grid[x + "x" + y][Obj.ID] == undefined)
					self.CollisionGrid.grid[x + "x" + y][Obj.ID] = true;
				
				if (Grids[x + "x" + y] == undefined)
					Grids[x + "x" + y] = true;
			}
			
			
			var y = min.y
			for (var x = min.x; x <= max.x; x += self.gridSize.x) {
				
				if (self.CollisionGrid.grid[x + "x" + y] == undefined)
					self.CollisionGrid.grid[x + "x" + y] = {};
				
				if (self.CollisionGrid.grid[x + "x" + y][Obj.ID] == undefined)
					self.CollisionGrid.grid[x + "x" + y][Obj.ID] = true;
				
				if (Grids[x + "x" + y] == undefined)
					Grids[x + "x" + y] = true;
			}
			var y = max.y
			for (var x = min.x; x <= max.x; x += self.gridSize.x) {
				
				if (self.CollisionGrid.grid[x + "x" + y] == undefined)
					self.CollisionGrid.grid[x + "x" + y] = {};
				
				if (self.CollisionGrid.grid[x + "x" + y][Obj.ID] == undefined)
					self.CollisionGrid.grid[x + "x" + y][Obj.ID] = true;
				
				if (Grids[x + "x" + y] == undefined)
					Grids[x + "x" + y] = true;
            }

            return Grids;
        },
    }
}

function updateStage(Obj) {
    
    //Delete object from old stage childrens list
    if (Obj.Parent && Obj.Parent.stage != undefined) {
        if (Obj.stageID != undefined)
            delete Obj.stage.allChilds[Obj.ID];
        Obj.stageID = Obj.Parent.stageID
        Obj.stage.allChilds[Obj.ID] = Obj;
        Obj.stage.DrawLoop.push(Obj.ID);
        Obj.anchored = Obj.anchored;
        Obj.position = Obj.position;
    }

    for (i in Obj.childs) {
        updateStage(Obj.childs[i]);
    }
}


function getObjectRotation(Obj) {
    
    return Obj.Parent ? Obj.rotation + getObjectRotation(Obj.Parent) : Obj.rotation;
}
function getObjectPosition(Obj) {
    
    return ((Obj.Parent && Obj.Parent != Obj.stage) ? Vector2.add(Vector2.multiply(Obj.position, Obj.Parent.scale), getObjectPosition(Obj.Parent)) : Obj.position);
}
function getObjectScale(Obj) {
    
    return ((Obj.Parent && Obj.Parent != Obj.stage) ? Vector2.add(Obj.Parent.scale, getObjectScale(Obj.Parent)) : Obj.scale);
}



//Base Class
function GameObject(Parent, properties, inheritances) {
    
    var Parent = Parent;
    
    var self = this
    
    Parent.__defineGetter__('forward', function() {
        return Vector2.fromAngle(getObjectRotation(Parent)+180);
    })
    Parent.__defineGetter__('right', function() {
        return Vector2.fromAngle(getObjectRotation(Parent)+270);
    })
    Parent.__defineGetter__('stage', function() {
        return Game[Parent.stageID];
    })
    
    
    Parent.__defineGetter__('ID', function() {
        return Parent.IDc;
    })
    Parent.__defineSetter__('ID', function(val) {
        
        if (Parent.Parent != undefined && Parent.Parent.childs[Parent.IDc] != undefined)
            delete Parent.Parent.childs[Parent.IDc];
        
        if (Parent.stage != undefined && Parent.stage.allChilds[Parent.IDc] != undefined)
            delete Parent.stage.allChilds[Parent.IDc];
        
        
        if (val.toString().indexOf(":") == -1)
            Parent.IDc = Parent.creatorID + ":" + val;
        else
            Parent.IDc = val;
        
        //if (typeof(Obj.ID) != "string" || Obj.ID.indexOf(":") == -1)
            //Obj.ID = Obj.creatorID + ":" + Obj.ID;
        
        
        if (Parent.Parent != undefined)
            Parent.Parent.childs[Parent.IDc] = this;
        
        if (Parent.stage != undefined)
            Parent.stage.allChilds[Parent.IDc] = this;
    })
    Parent.__defineGetter__('creatorID', function() {
        return Parent.CreatorID;
    })
    Parent.__defineSetter__('creatorID', function(val) {
        Parent.CreatorID = val;
        
        
        if (Parent.ID != undefined)
            Parent.ID = Parent.ID.toString().substr( Math.max(Parent.ID.toString().indexOf(":")+1, 0) )
    })
    Parent.__defineGetter__('classType', function() {
        return Parent.CreatorID;
    })
    

    
    Parent.__defineGetter__('globalPosition', function() {
        return getObjectPosition(Parent);
    })
    
    Parent.__defineGetter__('globalScale', function() {
        return getObjectScale(Parent);
    })
    


    //Property Index\\
    Parent.zIndex = 0;
    Parent.ClassType = Enum.ClassType.Unknown;
    Parent.anchored = false;
    Parent.update = {};
    Parent.extends = {};
    Parent.stageID = undefined;
    Parent.childs = {};
    Parent.position = new Vector2.new(0, 0);
    Parent.rotation = 0;
    Parent.size = Vector2.new(10, 10);
    Parent.scale = Vector2.new(1, 1);
    Parent.DrawObject = new DrawObject(Parent);
    Parent.color = "#" + Math.round(Math.random() * 1000000);
    Parent.creatorID = clientID;
    Parent.ID = Parent.ID || objectCount++;
    for (i in properties) Parent[i] = properties[i];
    for (i in inheritances) Parent.extends[i] = inheritances[i];
    
    
    //Methods\\
    Parent.destroy = function () {
        
        for (i in Parent.childs) {
            Parent.childs[i].destroy();
        }
        
        
        if (this.stage) {
            for (var oldGrid in Parent.oldGrids) {

                delete Parent.stage.CollisionGrid.grid[ oldGrid ][ Parent.ID ];
            }
            
            
            if (Parent.stage.PhysicsLoop[this.ID])
                delete Parent.stage.PhysicsLoop[this.ID];
            if (Parent.stage.CollisionLoop[this.ID])
                delete Parent.stage.CollisionLoop[this.ID];

            if (Parent.stage.DrawLoop.indexOf(Parent.ID) >= 0)
                Parent.stage.DrawLoop.splice(Parent.stage.DrawLoop.indexOf(Parent.ID), 1);
            
            
            this.update = {
                delete: function( Obj ) {

                    if (Obj.stage) {

                        delete Obj.stage.childs[Obj.ID];
                        delete Obj.stage.allChilds[Obj.ID];
                        Obj.stage = undefined;
                        Obj.stageID = undefined;
                    }
                    Obj.Parent = undefined;
                },
            }
        } else {
            
            delete self.Parent;
        }
        
        
        for (i in Parent.childs)
            Parent.childs[i].destroy();
        
    }
    Parent.addChild = function (Obj, claimOwnership) {
        
        if (Obj.stage != undefined && Obj.stage.DrawLoop.indexOf(Parent.ID) >= 0)
            Obj.stage.DrawLoop.splice(Obj.stage.DrawLoop.indexOf(Obj.ID), 1);
        this.childs[Obj.ID] = Obj;
        if (claimOwnership == undefined || claimOwnership)
            Obj.creatorID = Parent.creatorID;
        Obj.Parent = Parent
        updateStage(Obj);
        
        return Obj;
    }
}






function transformObject(Obj) {

    if (Obj.Parent == undefined)
        ctx.setTransform(1, 0, 0, 1, Obj.position.x, Obj.position.y);
    else {
        transformObject(Obj.Parent);
        ctx.transform(1, 0, 0, 1, Obj.position.x, Obj.position.y);
    }

    ctx.rotate((Obj.rotation / 180) * Math.PI);
    ctx.transform(Obj.scale.x, 0, 0, Obj.scale.y, 0, 0);
}






//Base Class
function DrawObject(Parent) {
    var self = this;
    this.Parent = Parent;

    this.update = function () {

        transformObject(this.Parent)

        ctx.fillStyle = self.Parent.color;
        ctx.fillRect(-self.Parent.size.x * 0.5, -self.Parent.size.y * 0.5, self.Parent.size.x, self.Parent.size.y);
        
        if (self.Parent.text) {
            
            ctx.textAlign = self.Parent.textAlign ? self.Parent.textAlign : "center";
            ctx.strokeStyle = self.Parent.strokeColor ? self.Parent.strokeColor : "rgba(255, 255, 255, 0.72)";
            if (self.textColor) ctx.fillStyle = self.textColor;
            ctx.strokeText(
                self.Parent.ID,
                self.Parent.textOffset ? self.Parent.textOffset.x : 0,
                self.Parent.textOffset ? self.Parent.textOffset.y : 0
            );
            ctx.fillText(
                self.Parent.ID,
                self.Parent.textOffset ? self.Parent.textOffset.x : 0,
                self.Parent.textOffset ? self.Parent.textOffset.y : 0
            );
        }
    }
}


//The name of the properties of a class that are suitable/allowed to be replicated
var replicateProperties = {
    ID: true,
    creatorID: true,
    position: true,
    rotation: true,
    //colour: true,
    size: true,
    velocity: true,
    rotateVelocity: true,
    ignoreObjectIDs: true,
    ignoreObjectType: true,
    stageID: true,
    health: true,
    animations: true,
    currentAnimation: true,
    scale: true,
    zIndex: true,
    text: true,
    //mass: true,
    pickupValue: true,
}

function PackageObject( Obj ) {
    
    var returnPackage = {
        parentID: Obj.Parent != undefined && Obj.Parent != Obj.stage ? Obj.Parent.ID : false,
    };
        
    returnPackage.constructorName = Obj.ClassType;
    
    for (var propertieName in replicateProperties) {
        if (Obj[propertieName] != undefined)
            returnPackage[propertieName] = Obj[propertieName];
    }
    
    return JSON.stringify(returnPackage);
}

socketio.on("UpdatePlayerlist", function (data) {
    
    connectionList = data;
});

socketio.on("IDrequest_to_client", function (data) {
    
    clientID = data.socketID;
    clientRoom = data.socketRoom;
    
    LoadWorld( Game.addChild( "BackgroundStage", new Stage() ), Enum.Worlds.BackgroundWorld );
    LoadWorld( Game.addChild( "MainStage", new Stage() ), Enum.Worlds.StartLobby );
});

setInterval(function() {
    socketio.emit('onHeartbeat');
}, 5000)



socketio.on("event", function (data) {
    
    var sendEvents = JSON.parse(data);
    if (data) {
        for (var index in sendEvents) {
            for (var eventName in sendEvents[index]) {
                events[eventName](sendEvents[index][eventName]);
            }
        }
    }
})



socketio.on("object_from_broadcaster", function (data) {
    
    var ReplicatedObjects = JSON.parse(data);
    for (index in ReplicatedObjects) {

        var ReplicatedObjectPackage = ReplicatedObjects[ index ];
        for (ObjID in ReplicatedObjectPackage) {

            var ReplicatedObject = ReplicatedObjectPackage[ ObjID ];

            //Check if the client owns the stage or if the sender is the same person as the recever
            if (ReplicatedObject.stageID != undefined && ReplicatedObject.creatorID != clientID)// && Game[ReplicatedObject.stageID])
            {

                if (!Game[ReplicatedObject.stageID])
                    Game[ReplicatedObject.stageID] = new Stage();


                var stage = Game[ReplicatedObject.stageID];


                /*if (stage.allChilds[ ReplicatedObject.ID ]) {
                    for (var i in ReplicatedObject) {
                        stage.allChilds[ ReplicatedObject.ID ][ i ] = ReplicatedObject[ i ];
                    }
                } else if (ReplicatedObject.parentID) {
                    var newObject = Enum.ClassName[ ReplicatedObject.constructorName ] ?
                        new Enum.ClassName[ ReplicatedObject.constructorName ](ReplicatedObject) :
                        new EmptyObject(ReplicatedObject);
                    stage.addChild(newObject, false);
                }*/

                // [1]>Check if the object already exists in the scene
                if (stage.allChilds[ReplicatedObject.ID]) {


                    // Update the object with the new properties
                    for (var i in ReplicatedObject) {
                        stage.allChilds[ReplicatedObject.ID][i] = ReplicatedObject[i];
                    }

                } else { // [1]<Otherwise, create the object

                    /* Check if the object's constructor fits the client's classes,                              *
                     * otherwise create an empty object with the properties                                      *
                     * ( should work fine if the object has no further interactions with the receiver's stage ). */
                    var newObject = Enum.ClassName[ReplicatedObject.constructorName] ? 
                        new Enum.ClassName[ReplicatedObject.constructorName](ReplicatedObject) :
                        new EmptyObject(ReplicatedObject);



                    // [2]>Check if the parent ID exists in the stage (if the object has one) and put it in the right place.
                    if (stage.allChilds[ReplicatedObject.parentID])
                        stage.allChilds[ReplicatedObject.parentID].addChild(newObject, false);

                    else // [2]<otherwise, put it in the stage
                        stage.addChild(newObject, false);
                }

            }
        }
    }
});

var SlowSendQue = {
    
};
slowSendSpeed = 300
nextSlowSend = 0;

var FastSendQue = {
    
};
FastSendSpeed = 30
nextFastSend = 0;

var EventQue = {};
EventCount = 0;


function sendEvent( eventName, properties ) {
    
    EventQue[EventCount++] = {
        [eventName]: properties,
    }
}


function sendObject(Obj, replicateChildren, FastSend) {
    
    
    if (FastSend) {
        FastSendQue[ Obj.ID ] = Obj;
        if (SlowSendQue[ Obj.ID ])
            delete SlowSendQue[ Obj.ID ];
    } else
        SlowSendQue[ Obj.ID ] = Obj;
    
    
    
    // Replicate the children if requested (for objects that are constructed by more objects (like a building or a stage))
    if (replicateChildren) {
        for (var i in Obj.childs)
            sendObject(Obj.childs[i], replicateChildren);
    }
}

setInterval(function() {
    var stringifyedObjects = "";
    
    
    // Package the objects into a JSON string format
    if (RENDERSETTINGS.renderDate > nextFastSend) {
       // console.log("FAST SEND!")
        for (var index in FastSendQue)
            stringifyedObjects += (stringifyedObjects ? ',' : '{' ) + '"F' + index + '":' + PackageObject( FastSendQue[ index ] );
        FastSendQue = {};
        nextFastSend = RENDERSETTINGS.renderDate + FastSendSpeed;
    }
    
    if (RENDERSETTINGS.renderDate > nextSlowSend) {
        //console.log("Slow send..")
        for (var index in SlowSendQue)
            stringifyedObjects += (stringifyedObjects ? ',' : '{' ) + '"S' + index + '":' + PackageObject( SlowSendQue[ index ] );
        SlowSendQue = {};
        nextSlowSend = RENDERSETTINGS.renderDate + slowSendSpeed;
    }
    
    
	if (stringifyedObjects) {
       // console.log("Sending..");
        // emit the object to the server for broadcasting
        socketio.emit("object_to_broadcaster", {
            stringifyedObject: stringifyedObjects + "}"
        });
    }
    
    
	if (Object.keys(EventQue).length > 0) {
        
        // emit the event to the server for broadcasting
        socketio.emit("event", JSON.stringify(EventQue));
        EventQue = {};
        EventCount = 0;
    }
}, 0)

























