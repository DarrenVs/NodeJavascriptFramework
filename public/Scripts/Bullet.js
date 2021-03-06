Enum.ClassName[Enum.ClassType.Bullet] = Bullet;

//Sub Class
function Bullet(properties) {
    
    this.explodeRadius = Vector2.new(10, 10);
    this.damage = 20;
    this.lifeTime = 1;
    
    GameObject(this, properties);
    this.extends = {
        physics: Physics(this),
        collision: Collision(this),
    };
    var self = this;
    
    this.ClassType = Enum.ClassType.Bullet;
    this.ignoreObjectType[Enum.ClassType.Bullet] = true;
    
    this.hitbox = Vector2.new(5, 5);
    this.mass = 100;
    this.velocity = Vector2.multiply(Vector2.fromAngle(self.rotation), -1000);
    this.colour = "#714b4b"
    this.update["bullet"] = function() {
        self.lifeTime -= RENDERSETTINGS.renderTime;
        if (self.lifeTime <= 0)
            self.destroy();
    }
    this.collisionEnter["explode"] = function( Obj, direction, force, distance, canCollide) {
        
        if (canCollide) {
            explosion(self.position, self.explodeRadius, self.damage, self.stageID, self.ignoreObjectIDs, self.ID);
            self.destroy();
            //delete self.collisionEnter["explode"]; // To prevent the bullet from making multible explosions in one frame
        }
    }
}

function ExplosionObject(properties) {
    var self = this;
    GameObject(this, properties);
    
    this.extends = {
        "collision": Collision(this),
    }
    this.colliderType = Enum.colliderType.circle;
    this.anchored = true;
    this.mass = 100;
    this.size = this.hitbox = new Vector2.new(10,10);
    this.damage = 20;
    this.anchored = true;
    var damagedObjectIDs = {};
    this.ignoreObjectType = {
        [Enum.ClassType.Bullet]: true
    }
    
    
    this.alive = 1;
    
    
    this.collisionEnter["explosion"] = function(Obj) {
        if (Obj.ClassType == Enum.ClassType.Player && !damagedObjectIDs[Obj.ID]) {
            Obj.health -= self.damage;
            damagedObjectIDs[Obj.ID] = true;
        }
    }
    this.update["explosion"] = function() {
        
        if (self.alive--<=0)
            self.destroy();
    }
}

function explosion(position, radius, damage, stageID) {
    
    Game[stageID].addChild(new ExplosionObject({
        position: new Vector2.new(position.x, position.y),
        hitbox:radius,
        damage:damage,
    }));
}