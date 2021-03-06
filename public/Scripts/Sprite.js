//SubClass
function Sprite( Parent, Img, sprites, animations ) {
    var self = this;
    self.Parent = Parent;
    
    var spriteImg = Img;
    var sprites = sprites;
    self.Parent.animations = animations || {};
    self.spriteOffset = Vector2.new();
    self.spriteSize = self.Parent.size;
    
    for (var i in sprites)
        sprites[i].cellSize = Vector2.new( sprites[i].size.x / sprites[i].columns, sprites[i].size.y / sprites[i].rows );
    
    
    
    self.Parent.currentAnimation = "";
    this.__defineGetter__('currentAnimation', function() {
        return self.Parent.currentAnimation;
    });
    this.__defineSetter__('currentAnimation', function(val) {
        if (self.Parent.animations[val] != undefined)
            self.Parent.currentAnimation = val;
        else console.log(val + " animation does not exist");
    });
    
    
    
    //Set the currentAnimation to the first animation in the animations list
    for (var i in self.Parent.animations) {self.Parent.currentAnimation = i; break;}
    
    

    
    this.update = function() {
        var currentFrame = self.Parent.animations[ self.Parent.currentAnimation ].keyFrames[ Math.floor(self.Parent.animations[ self.Parent.currentAnimation ].currentKeyFrame) ];
        var currentSprite = sprites[ self.Parent.animations[ self.Parent.currentAnimation ].sprite ];
        
        if (self.Parent.animations[ self.Parent.currentAnimation ].loop)
            self.Parent.animations[ self.Parent.currentAnimation ].currentKeyFrame = (self.Parent.animations[ self.Parent.currentAnimation ].currentKeyFrame + self.Parent.animations[ self.Parent.currentAnimation ].speed ) % (self.Parent.animations[ self.Parent.currentAnimation ].keyFrames.length);
        /*else if (self.Parent.animations[ self.Parent.currentAnimation ].currentKeyFrame < self.Parent.animations[ self.Parent.currentAnimation ].keyFrames.length)
            self.Parent.animations[ self.Parent.currentAnimation ].currentKeyFrame = (self.Parent.animations[ self.Parent.currentAnimation ].currentKeyFrame + self.Parent.animations[ self.Parent.currentAnimation ].speed ) % (self.Parent.animations[ self.Parent.currentAnimation ].keyFrames.length);*/
        
        transformObject(self.Parent);
        
        ctx.drawImage(
            
            spriteImg,
            currentSprite.position.x + (currentFrame % currentSprite.columns) * (currentSprite.size.x / currentSprite.columns) + 1, // Crop position.x
            currentSprite.position.y + Math.floor(currentFrame / currentSprite.columns) * (currentSprite.size.y / currentSprite.rows) + 1, // Crop position.y
            
            currentSprite.cellSize.x - 2, currentSprite.cellSize.y - 2, // Crop size
            
            -(self.spriteSize != undefined ? self.spriteSize.x : currentSprite.cellSize.x) * .5 + self.spriteOffset.x, // Image PositionX
            -(self.spriteSize != undefined ? self.spriteSize.y : currentSprite.cellSize.y) * .5 + self.spriteOffset.y, // Image PositionY
            
            self.spriteSize != undefined ? self.spriteSize.x : currentSprite.cellSize.x, //Sprite sizeX
            self.spriteSize != undefined ? self.spriteSize.y : currentSprite.cellSize.y // Sprite sizeY
        );
    }
}



//To create easy images in the Enum
function newImage( src ) {
    
    var Img = new Image();
    Img.src = src;
    
    return Img;
}