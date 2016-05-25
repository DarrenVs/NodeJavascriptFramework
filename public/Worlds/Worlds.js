var Worlds = [
    
    
]

function LoadWorld( stage, worldID ) {
    
    stage.addChild( new Worlds[worldID]( stage, worldID ) );

}
