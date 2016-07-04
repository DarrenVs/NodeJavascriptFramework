Enum.Worlds.GameUIWorld = Worlds.length;

Worlds[Enum.Worlds.GameUIWorld] = function( stage ) {
    GameObject( this );
    
    stage.addChild(new PickupUI());
}