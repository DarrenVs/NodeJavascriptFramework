Enum.ClassName[Enum.ClassType.ParallaxObject] = ParallaxObject;

// BaseClass
function ParallaxObject(properties, layer) {
    var self = this;
    GameObject(this, properties);
    
    this.extends = {
        collision: Collision(this),
    };
    
    var startStagePositionY = 0;
    
    var startPositionY = self.position.y;
    
    self.colliderType = Enum.colliderType.box;
    
    self.hitbox = Vector2.new(0, 0);
    
    self.canCollide = false;
    
    self.anchored = true;
    
    this.DrawObject = new Sprite(
        this,   //Parent
        Enum.Images.Sprites.ParallaxObjects[layer][Math.floor(Math.random() * Enum.Images.Sprites.ParallaxObjects[layer].length)],   //Image
        {   //Sprites
            parallaxObject: {
                position: Vector2.new(0, 0),
                size: Vector2.new(125, 189),
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
        self.position.y = startPositionY - self.stage.getGlobalPos(self.stage).y / layer - startStagePositionY;
    }
    
    this.manualDestroy = function() {
        self.position =  startPositionY = self.stage.position.y - Math.random() * 1000;
    }
}