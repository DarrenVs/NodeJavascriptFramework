//SubClass
function Sprite( Parent, Img, sprites, animations ) {
    var self = this;
    self.Parent = Parent;
    
    var spriteImg = Img;
    var sprites = sprites;
    var animations = animations || {};
    
    for (var i in sprites)
        sprites[i].cellSize = Vector2.new( sprites[i].size.x / sprites[i].columns, sprites[i].size.y / sprites[i].rows );
    
    
    //this.currentAnimation = "";
    this.__defineGetter__('currentAnimation', function() {
        return currentAnimation;
    });
    this.__defineSetter__('currentAnimation', function(val) {
        if (animations[val] != undefined)
            currentAnimation = val;
        else console.log(val + " animation does not exist");
    });
    
    
    
    //Set the currentAnimation to the first animation in the animations list
    for (var i in animations) {self.currentAnimation = i; break;}
    
    

    
    this.update = function() {
        var currentFrame = animations[ currentAnimation ].keyFrames[ Math.floor(animations[ currentAnimation ].currentKeyFrame) ];
        var currentSprite = sprites[ animations[ currentAnimation ].sprite ];
        
        if (animations[ currentAnimation ].loop)
            animations[ currentAnimation ].currentKeyFrame = (animations[ currentAnimation ].currentKeyFrame + animations[ currentAnimation ].speed ) % (animations[ currentAnimation ].keyFrames.length);
        /*else if (animations[ currentAnimation ].currentKeyFrame < animations[ currentAnimation ].keyFrames.length)
            animations[ currentAnimation ].currentKeyFrame = (animations[ currentAnimation ].currentKeyFrame + animations[ currentAnimation ].speed ) % (animations[ currentAnimation ].keyFrames.length);*/
        
        transformObject(self.Parent);
        
        ctx.drawImage(
            
            spriteImg,
            currentSprite.position.x + (currentFrame % currentSprite.columns) * (currentSprite.size.x / currentSprite.columns) + 1, // Crop position.x
            currentSprite.position.y + Math.floor(currentFrame / currentSprite.columns) * (currentSprite.size.y / currentSprite.rows) + 1, // Crop position.y
            
            currentSprite.cellSize.x - 2, currentSprite.cellSize.y - 2, // Crop size
            
            -Parent.size.x*.5, -Parent.size.y*.5, // Image Position
            
            Parent.size.x, Parent.size.y // Sprite size
        );
    }
}



//To create easy images in the Enum
function newImage( src ) {
    
    var Img = new Image();
    Img.src = src;
    
    return Img;
}