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
}