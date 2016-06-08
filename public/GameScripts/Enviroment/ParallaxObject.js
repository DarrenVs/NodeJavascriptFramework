Enum.ClassName[Enum.ClassType.ParallaxObject] = ParallaxObject;

// BaseClass
function ParallaxObject(properties, stage, layer) {
    var self = this;
    GameObject(this, properties);
    
    var startStagePositionY = 0;
    
    var startPositionY = self.position.y;
    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.ParallaxObjects[layer][Math.floor(Math.random() * Enum.Images.Sprites.ParallaxObjects[layer].length)],   //Image
        {   //Sprites
            parallaxObject: {
                position: Vector2.new(0, 0),
                size: Vector2.new(40, 40),
                columns: 1,
                rows: 1,
            },
        },
        {   //Animations
            parallaxObject: {
                sprite: "parallaxObject",
                speed: 0, //Per frame
                keyFrames: [0], //AnimationFrame
                currentKeyFrame: 0, //Where to start
                loop: true, //Should it loop? (WIP!)
            },
        }
    );
    
    this.update["parallaxObjectUpdate"] = function() {     
        self.position.y = startPositionY - stage.getGlobalPos(stage).y / layer - startStagePositionY;
    }
}