var Parallax = function() {
    GameObject( this );
    
    var self = this;

    var alreadySpawned = false;
    
    var spawnYPosition = 6000;
    
    var spawnDistance = 5;
    
    var stagePosition = 0;
    
    var size = 500;
    
    var borderOffset = canvas.width / 7;
    
    var layers = {
        
        2: {
            maxLayerCount: 5,
        },
        3: {
            maxLayerCount: 7,
        },
        4: {
            maxLayerCount: 12,
        },
    };
    
    for(var l in layers) {
        for(c = 0; c < layers[l].maxLayerCount; c++) {
            var newObject = new Enum.ClassName[Enum.ClassType.ParallaxObject]({
                    size: new Vector2.new(0, 0),
                    position: new Vector2.new(borderOffset + Math.random() * (canvas.width - (borderOffset * 2)), canvas.height - spawnYPosition * Math.random()),
                },
                l
            )
                
            self.addChild( newObject );
        }
                    
    }
}