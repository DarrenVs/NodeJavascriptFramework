var Parallax = function() {
    GameObject( this );
    
    var self = this;

    var alreadySpawned = false;
    
    var spawnYPosition = 200;
    
    var spawnDistance = 5;
    
    var stagePosition = 0;
    
    var layers = {
        
        2: {
            maxLayerCount: 3,
        },
        3: {
            maxLayerCount: 5,
        },
        4: {
            maxLayerCount: 10,
        },
    };
    
    /*
    for(var l in layers) {
        for(c = 0; c < layers[l].maxLayerCount; c++) {
            var newObject = new Enum.ClassName[Enum.ClassType.ParallaxObject]({
                    size: new Vector2.new(100 * l, 100 * l),
                    position: new Vector2.new(Math.random() * canvas.width, spawnYPosition * Math.random()),
                },
                l
            )
                
            self.addChild( newObject );
        }
                    
    }*/
}