var cameraController = {
    
    highestPlayerPos: 270,
    
    cameraPosition: function() {
        //keep the camera at the position of the highest player
        for (var index in PlayerProperties.playerList) {
            if(PlayerProperties.playerList[index].position.y < this.highestPlayerPos) {
                this.highestPlayerPos =  PlayerProperties.playerList[index].position.y
            } 
        }

        return -this.highestPlayerPos + canvas.height / 3.5;
    },
}