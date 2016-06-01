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
var clientID = undefined;
var Game = {};

var PhysicsLoop = {};

function updateObject(obj) {

    if (obj.update) {
        for (i in obj.update) {
            if (obj.Parent)
                obj.update[i]( obj, RENDERSETTINGS.deltaTime );
        }
    }
    //if (RENDERSETTINGS.renderTime < 1 && obj.DrawObject)
    
    if (obj.Parent)
        obj.DrawObject.update();

    //if (RENDERSETTINGS.renderTime > 1)
    //    console.log(RENDERSETTINGS.FPS);

    if (obj.childs) {
        for (i in obj.childs)
            updateObject(obj.childs[i]);
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
        //canvas.width = window.innerWidth;
        //canvas.height = window.innerHeight;
        
        canvas.width = 600;
        canvas.height = 960;
    })();
    
    
    


    //  Values
    

    ! function drawFrame() {
        RENDERSETTINGS.renderTime = Math.min((new Date().getTime() - RENDERSETTINGS.renderDate) * 0.001, 10);
        RENDERSETTINGS.renderDate = new Date().getTime();
        
        RENDERSETTINGS.FPS = 1 / RENDERSETTINGS.renderTime;
        
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillRect(0,0,canvas.width, canvas.height);
        //ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var stageIndex in Game) {
            updateObject(Game[stageIndex]);
            for (var i = 0; i < RENDERSETTINGS.renderTime; i+=1/60) {
                
                RENDERSETTINGS.deltaTime = Math.min(RENDERSETTINGS.renderTime - i, 1/60);
                
                for (var ObjID in PhysicsLoop) {
                    updatePhysics( Game[stageIndex].allChilds[ObjID], RENDERSETTINGS.deltaTime );
                }
                
                for (var index in CollisionGrid.grid) {
                    
                    for (var ObjID in CollisionGrid.grid[index])
                        updateCollision( Game[stageIndex].allChilds[ObjID], RENDERSETTINGS.deltaTime );
                }
            }
        }
        
        
        MOUSE_CLICK = {};
        INPUT_CLICK = {};
        
        window.requestAnimationFrame(drawFrame);
    }()
})






//Base Class
function Stage(properties) {

    //this.gravity = new Vector2.new(0, 9.8);
    this.gravity = Vector2.new();//new Vector2.new(450, 450);//canvas.width/2, canvas.height/2);
    this.gravityType = Enum.gravity.global;//Enum.gravity.worldPoint;
    
    this.airDensity = .01;

    var self = this;
    
    
    GameObject(this, properties);
    
    
    this.__defineGetter__('mousePosition', function(val) {
        return Vector2.subtract( MOUSE.Position, self.position );
    });
    
    
    this.getGlobalPos = function( Obj ) {
        var position = Vector2.new(Obj.position.x, Obj.position.y);
        
        if (Obj.Parent != undefined)
            position = Vector2.add( position, getPos(Obj.Parent))
            
        return position;
    }

    this.allChilds = {};
    this.stageID = 0;
    
    
    this.addChild(new Background());
    
    this.update["cameraMovement"] = function() {
        
        if (self.creatorID == clientID) {
            
            /*if (INPUT["38"]) self.position = Vector2.add(self.position, new Vector2.new(0,-1));
            if (INPUT["40"]) self.position = Vector2.add(self.position, new Vector2.new(0,1));
            if (INPUT["37"]) self.position = Vector2.add(self.position, new Vector2.new(-1,0));
            if (INPUT["39"]) self.position = Vector2.add(self.position, new Vector2.new(1,0));*/
        }
    }
}

function updateStage(Obj) {
    
    //Delete object from old stage childrens list
    if (Obj.Parent && Obj.Parent.stage != undefined) {
        if (Obj.stageID != undefined)
            delete Obj.stage.allChilds[Obj.ID];
        Obj.stageID = Obj.Parent.stageID
        Obj.stage.allChilds[Obj.ID] = Obj;
    }

    for (i in Obj.childs) {
        updateStage(Obj.childs[i]);
    }
}


function getObjectRotation(Obj) {
    
    return Obj.Parent ? Obj.rotation + getObjectRotation(Obj.Parent) : Obj.rotation;
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
    

    


    //Property Index\\
    Parent.ClassType = Enum.ClassType.Unknown;
    Parent.anchored = false;
    Parent.update = {};
    Parent.extends = {};
    Parent.stageID = undefined;
    Parent.childs = {};
    Parent.position = new Vector2.new(0, 0);
    Parent.rotation = 0;
    Parent.size = new Vector2.new(10, 10);
    Parent.DrawObject = new DrawObject(Parent);
    Parent.colour = "#" + Math.round(Math.random() * 1000000);
    Parent.creatorID = clientID;
    Parent.ID = Parent.ID || objectCount++;
    for (i in properties) Parent[i] = properties[i];
    for (i in inheritances) Parent.extends[i] = inheritances[i];
    
    
    //Methods\\
    Parent.destroy = function () {

        for (var oldGrid in Parent.oldGrids) {
            
            delete CollisionGrid.grid[ oldGrid ][ Parent.ID ];
        }
        
        if (PhysicsLoop[this.ID])
            delete PhysicsLoop[this.ID];
        
        if (this.stage) {
            
            this.update["delete"] = function( Obj ) {
                
                if (Obj.stage) {

                    delete Obj.stage.childs[Obj.ID];
                    delete Obj.stage.allChilds[Obj.ID];
                    Obj.stage = undefined;
                    Obj.stageID = undefined;
                }
                Obj.Parent = undefined;
            }
        } else {
            
            delete self.Parent;
        }
        
        
        for (i in Parent.childs)
            Parent.childs[i].destroy();
        
    }
    Parent.addChild = function (obj, claimOwnership) {
        
        this.childs[obj.ID] = obj;
        if (claimOwnership == undefined || claimOwnership)
            obj.creatorID = Parent.creatorID;
        obj.Parent = Parent
        updateStage(obj);
        
        return obj;
    }
}






function transformObject(obj) {

    if (obj.Parent == undefined)
        ctx.setTransform(1, 0, 0, 1, obj.position.x, obj.position.y);
    else {
        transformObject(obj.Parent);
        ctx.transform(1, 0, 0, 1, obj.position.x, obj.position.y);
    }

    ctx.rotate((obj.rotation / 180) * Math.PI);
}






//Base Class
function DrawObject(Parent) {
    var self = this;
    this.Parent = Parent;

    this.update = function () {

        transformObject(this.Parent)

        ctx.fillStyle = self.Parent.colour;
        ctx.fillRect(-self.Parent.size.x * 0.5, -self.Parent.size.y * 0.5, self.Parent.size.x, self.Parent.size.y);
        
        if (self.Parent.physicalAppearance) {
            ctx.beginPath();
            ctx.arc(0,0,self.Parent.physicalAppearanceSize/2,0,2*Math.PI);
            ctx.closePath();
            ctx.stroke();
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
    //mass: true,
}

function PackageObject( Obj ) {
    
    var returnPackage = {
        parentID: Obj.Parent ? Obj.Parent.ID : false,
    };
        
    returnPackage.constructorName = Obj.ClassType;
    
    for (var propertieName in replicateProperties) {
        if (Obj[propertieName] != undefined)
            returnPackage[propertieName] = Obj[propertieName];
    }
    
    return JSON.stringify(returnPackage);
}


var socketio = io.connect(window.location.host);

socketio.on("IDrequest_to_client", function (data) {
    
    clientID = data;
    Game[0] = new Stage();
    LoadWorld( Game[0], Enum.Worlds.BattleArena );
    //LoadWorld( Game[0], Enum.Worlds.TestWorld );
    
});



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
}, 0)

















































