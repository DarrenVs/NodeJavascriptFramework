


Vector2 = {
    
    
    new: function(x, y) {
        
        return {x: x || 0, y: y || 0}
    },
    
    
    
    add: function(pos1, pos2) {
        
        var pos3 = new Vector2.new();
        if (typeof(pos2) == "number") {
            pos3.x = pos1.x + pos2;
            pos3.y = pos1.y + pos2;
        } else {
            pos3.x = pos1.x + pos2.x;
            pos3.y = pos1.y + pos2.y;
        }
        return pos3;
    },
    
    
    
    subtract: function(pos1, pos2) {
        
        var pos3 = new Vector2.new();
        if (typeof(pos2) == "number") {
            pos3.x = pos1.x - pos2;
            pos3.y = pos1.y - pos2;
        } else {
            pos3.x = pos1.x - pos2.x;
            pos3.y = pos1.y - pos2.y;
        }
        return pos3;
    },
    
    
    
    multiply: function(pos1, pos2) {
        
        var pos3 = new Vector2.new();
        if (typeof(pos2) == "number") {
            pos3.x = pos1.x * pos2;
            pos3.y = pos1.y * pos2;
        } else {
            pos3.x = pos1.x * pos2.x;
            pos3.y = pos1.y * pos2.y;
        }
        return pos3;
    },
    
    
    
    divide: function(pos1, pos2) {
        
        var pos3 = new Vector2.new();
        if (typeof(pos2) == "number") {
            pos3.x = pos1.x / pos2;
            pos3.y = pos1.y / pos2;
        } else {
            pos3.x = pos1.x / pos2.x;
            pos3.y = pos1.y / pos2.y;
        }
        return pos3;
    },
    
    
    
    magnitude: function(pos1, pos2) {
        pos2 = pos2 || new Vector2.new(0,0);
        pos1 = pos1 || new Vector2.new(0,0);
    
        return Math.sqrt( Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2) );
    },
    
    
    
    toAngle: function(pos1, pos2) {
        pos2 = pos2 || new Vector2.new(0,0);
        pos1 = pos1 || new Vector2.new(0,0);
        
        return Math.atan2( pos1.x - pos2.x, (pos1.y - pos2.y)*-1 ) * 180 / Math.PI;
    },
    
    
    
    fromAngle: function(angle) {
        
        angle+=90;
        return new Vector2.new (
            Math.cos( angle * Math.PI / 180 ) * -1,
            Math.sin( angle * Math.PI / 180 ) * -1
        );
    },
    
    
    
    unit: function(pos1) {
        
        var distance = Vector2.magnitude(pos1);
        return new Vector2.new (
            pos1.x / distance,
            pos1.y / distance
        );
    },
    
    
    
    compare: function(pos1, pos2) {
        
        return (pos1.x == pos2.x && pos1.y == pos2.y)
    },
    
    directions: {
        
    }
}

Vector2.directions.up = new Vector2.new(0, -1);
Vector2.directions.right = new Vector2.new(-1, 0);
Vector2.directions.down = new Vector2.new(0, 1);
Vector2.directions.left = new Vector2.new(1, 0);

/* {Start} Game Element Functions {{

//		 V2 ( x value, y value )  2D Array, vergelijkbaar met een AS3 :Point |		sample =	new Vector2 ( 10, 20 );  sample.x == 10		|
function V2 ( X, Y ) {
	
	return { x: X, y: Y };
}

//		 distance( V2(0, 0), V2(10, 18) ) == 20.591260281974	|		distance( player.prop.position, enemy.prop.position ) <= 100
function distance( pos1, pos2 ) {
	
	return Math.sqrt( Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2) )
}

function addVar( obj, propertie ) {
	
	console.log(propertie);
}

function getPosFromAngle( angle ) {
	
	return new V2(
		Math.cos( angle * Math.PI / 180 ),
		Math.sin( angle * Math.PI / 180 )
	);
}

function getAngleFromPos( pos1, pos2 ) {
	
	return Math.abs((Math.atan2( pos1.x - pos2.x, pos1.y - pos2.y ) * 180 / Math.PI * -1) + 360)%360;
}

// {End} Game Element Functions }}*/