Enum.Worlds.BackgroundWorld = Worlds.length;

Worlds[Enum.Worlds.BackgroundWorld] = function( stage ) {
    GameObject( this );

    var backGround = new Enum.ClassName[Enum.ClassType.Background]({
        size: new Vector2.new(canvas.width, canvas.height),
        position: new Vector2.new(canvas.width / 2, canvas.height / 2),
    })

    stage.addChild( backGround );
}