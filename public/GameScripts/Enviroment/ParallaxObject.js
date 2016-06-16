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
    
    var parallaxSize = 2;
    
    var parallaxImage = Enum.Images.Sprites.ParallaxObjects[layer][Math.floor(Math.random() * Enum.Images.Sprites.ParallaxObjects[layer].length)];
    
    self.size = new Vector2.new((parallaxImage.width / layer) * parallaxSize, (parallaxImage.height / layer) * parallaxSize);
    
    this.DrawObject = new Sprite(
        this,   //Parent
        parallaxImage,   //Image
        {   //Sprites
            parallaxObject: {
                position: Vector2.new(0, 0),
                size: Vector2.new(parallaxImage.width, parallaxImage.height),
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
        self.position = new Vector2.new(canvas.width * Math.random(), -self.stage.position.y - Math.random());
        startPositionY = self.position.y;
    }
}