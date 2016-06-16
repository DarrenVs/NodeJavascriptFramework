Enum.Worlds.BackgroundWorld = Worlds.length;

Worlds[Enum.Worlds.BackgroundWorld] = function( stage ) {
    GameObject( this );
    console.log("yo");
    stage.addChild(new Enum.ClassName[Enum.ClassType.Background]);
}