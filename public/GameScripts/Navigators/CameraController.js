var cameraController = {
    
    highestPlayerPos: 800,
    
    cameraPosition: function() {
        //keep the camera at the position of the highest player
        for (var index in playerList) {
            if(playerList[index].position.y < this.highestPlayerPos) {
                this.highestPlayerPos =  playerList[index].position.y
            } 
        }

        return -this.highestPlayerPos + canvas.height / 3.3;
    },
}