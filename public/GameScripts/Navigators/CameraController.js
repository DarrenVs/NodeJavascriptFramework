var cameraController = {
    
    highestPlayerPos: 270,
    
    cameraYOffset: 3.5,
    
    cameraPosition: function() {
        //keep the camera at the position of the highest player
        for (var index in PlayerProperties.activePlayers) {
            if(PlayerProperties.activePlayers[index].position.y < this.highestPlayerPos) {
                this.highestPlayerPos =  PlayerProperties.activePlayers[index].position.y;
            } 
        }
        
        return -this.highestPlayerPos + canvas.height / this.cameraYOffset;
    },
    
    resetCamera: function() {
        this.highestPlayerPos = 270;
    },
}