Enum.Worlds.Parallax = Worlds.length;

Worlds[Enum.Worlds.Parallax] = function( stage ) {
    GameObject( this );
    
    var self = this;

    var alreadySpawned = false;
    
    var spawnYPosition = 200;
    
    var spawnDistance = 5;
    
    var stagePosition = 0;
    
    var layers = {
        
        1: {
            maxLayerCount: 3,
        },
        2: {
            maxLayerCount: 5,
        },
        3: {
            maxLayerCount: 10,
        },
    };
    
    /*
                var newObject = new Enum.ClassName[Enum.ClassType.ParallaxObject]({
                    size: new Vector2.new(1000, 1000),
                    position: new Vector2.new(Math.random() * canvas.width, spawnYPosition * Math.random()),
                },
                stage,
                2
            )
    stage.addChild( newObject );
    */
    
    for(var l in layers) {
        for(c = 0; c < layers[l].maxLayerCount; c++) {
            var newObject = new Enum.ClassName[Enum.ClassType.ParallaxObject]({
                    size: new Vector2.new(100 * l, 100 * l),
                    position: new Vector2.new(Math.random() * canvas.width, spawnYPosition * Math.random()),
                },
                stage,
                l
            )
                
            stage.addChild( newObject );
        }
                    
    }
    
    /*
    this.update["ParallaxUpdate"] = function() {
        
        if(Math.round(self.stage.getGlobalPos(self.stage).y % spawnDistance) == 0) {
            if(!alreadySpawned) {
                
                for(var i in layers) {
                    if(layers[i].layerCount <= layers[i].maxLayerCount) {
                        
                    }
                    
                } 
                
                console.log("spawn");
                alreadySpawned = true;
            }
        } else {
            alreadySpawned = false;
        }
    }*/
}