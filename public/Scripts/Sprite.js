//SubClass
function Sprite( Parent, Img, columns, rows, animations ) {
    var self = this;
    self.Parent = Parent;
    
    var spriteImg = Img;
    var rows = rows || 1;
    var columns = columns || 1;
    var animations = animations || {};
    var cellSize = Vector2.new( spriteImg.width / columns, spriteImg.height / rows );
    
    
    this.CurrentAnimation = "";
    this.__defineGetter__('currentAnimation', function() {
        return self.CurrentAnimation;
    })
    this.__defineSetter__('currentAnimation', function(val) {
        if (animations[val] != undefined)
            self.CurrentAnimation = val;
        else console.log(val + " animation does not exist");
    })
    
    
    
    //Set the currentAnimation to the first animation in the animations list
    for (var i in animations) {currentAnimation = i; break;}
    
    

    
    this.update = function() {
        var currentFrame = animations[ currentAnimation ].keyFrames[ Math.floor(animations[ currentAnimation ].currentKeyFrame) ];
        
        if (animations[ currentAnimation ].loop)
            animations[ currentAnimation ].currentKeyFrame = (animations[ currentAnimation ].currentKeyFrame + animations[ currentAnimation ].speed ) % (animations[ currentAnimation ].keyFrames.length);
        /*else if (animations[ currentAnimation ].currentKeyFrame < animations[ currentAnimation ].keyFrames.length)
            animations[ currentAnimation ].currentKeyFrame = (animations[ currentAnimation ].currentKeyFrame + animations[ currentAnimation ].speed ) % (animations[ currentAnimation ].keyFrames.length);*/
        
        transformObject(self.Parent);
        
        ctx.drawImage(
            
            spriteImg,
            (currentFrame % columns) * (spriteImg.width / columns) + 1, // Crop position.x
            Math.floor(currentFrame / columns) * (spriteImg.height / rows) + 1, // Crop position.y
            
            cellSize.x - 2, cellSize.y - 2, // Crop size
            
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