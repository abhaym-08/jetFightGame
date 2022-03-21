class Ball {
    constructor(x, y) {
      
      this.r = 40;
  
      this.ball = createSprite(x, y, this.r);
  
      this.image = loadImage("./assets/cannonball.png");
      
    }
  
    shoot() {
      var velocity = p5.Vector.fromAngle(cannon.angle);
      velocity.mult(20);
      ball.static = false;
      ball.setVelocity(velocity.x, velocity.y)
    }
  
    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.image, 0, 0, this.r, this.r);
      pop();
  
      }
    }
  
  