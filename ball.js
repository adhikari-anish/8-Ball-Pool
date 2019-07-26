const BALL_DIAMETER = 38;
const BALL_RADIUS = BALL_DIAMETER / 2;

function Ball(initPos, color) {
  this.initPos = initPos;
  this.position = initPos.copy();
  this.origin = new Vector2(25, 25);
  this.velocity = new Vector2();
  this.moving = false;
  this.sprite = getBallSpriteByColor(color);
  this.color = color;
  this.visible = true;
  this.inHole = false;
}

Ball.prototype.update = function(delta) {

  this.updatePosition(delta);

  //applying friction
  this.velocity = this.velocity.mult(0.98);

  if(this.moving && Math.abs(this.velocity.x) < 1 && Math.abs(this.velocity.y) < 1) {
    this.stop();
  }
}

Ball.prototype.updatePosition = function(delta) {
  if(!this.moving || this.inHole)
    return;

  var ball = this;
  var newPos = this.position.addTo(this.velocity.mult(delta));

  if(poolGame.policy.isInsideHole(newPos)) {

    if(poolGame.sound && SOUND_ON) {
      var holeSound = sounds.hole.cloneNode(true);
      holeSound.volume = 0.5;
      holeSound.play();
    }

    this.position = newPos;
    this.inHole = true;
    setTimeout(function() {ball.visible = false; ball.velocity = Vector2.zero;}, 100);
    poolGame.policy.handleBallInHole(this);
    return;
  }

  var collision = this.handleCollision(newPos);

    if(collision){
      this.velocity = this.velocity.mult(0.98);

      // if(poolGame.sound && SOUND_ON) {
      //   var side = sounds.side.cloneNode(true);
      //   side.volume = 0.1;
      //   side.play();
      // }
    }else{
    	this.position = newPos;
    }
}

Ball.prototype.draw = function() {

  if(!this.visible) {
    return;
  }

  canvas.drawImage(this.sprite, this.position, CONSTANTS.ballOrigin);
}

Ball.prototype.shoot = function(power, rotation) {

  if(power <= 0)
    return;
    
  this.moving = true;

  this.velocity = calculateBallVelocity(power, rotation);
}

var calculateBallVelocity = function(power, rotation) {
  return new Vector2(power * Math.cos(rotation), power * Math.sin(rotation));
}

Ball.prototype.collideWithBall = function(ball) {

  if(this.inHole || ball.inHole)
    return;

  if(!this.moving && !ball.moving) 
    return;

  //finding a normal vector

  const n = this.position.subtract(ball.position);
  const dist = n.length();

  if(dist > BALL_DIAMETER) {
    return;
  }

  poolGame.policy.checkColisionValidity(this, ball);

  if(poolGame.sound && SOUND_ON) {
    var ballsCollide = sounds.ballsCollide.cloneNode(true);
    ballsCollide.play();
  }

  // finding minimum translation distance //so that two balls doesn't merge after collision

  const mtd = n.mult((BALL_DIAMETER - dist) / dist);

  //push-pull balls apart
  this.position = this.position.add(mtd.mult(1/2));
  ball.position = ball.position.subtract(mtd.mult(1/2));

  //finding unit normal vector
  const un = n.mult(1/n.length());

  //finding unit tangent vector
  const ut = new Vector2(-un.y, un.x);

  // Project velociites onto the unit normal and unit tangent vectors
  const v1n = un.dot(this.velocity);
  const v1t = ut.dot(this.velocity);
  const v2n = un.dot(ball.velocity);
  const v2t = ut.dot(ball.velocity); 

  // Finding new normal velocities
  let v1nTag = v2n;
  let v2nTag = v1n;

  // Converting scalar normal and tangential velocities into vectors
  v1nTag = un.mult(v1nTag);
  const v1tTag = ut.mult(v1t);
  v2nTag = un.mult(v2nTag);
  const v2tTag = ut.mult(v2t);

  // updating velocities
  this.velocity = v1nTag.add(v1tTag);
  ball.velocity = v2nTag.add(v2tTag);

  this.moving = true;
  ball.moving = true;

}

Ball.prototype.handleCollision = function(newPos){

	var collision = false;

	if(poolGame.policy.isXOutsideLeftBorder(newPos, this.origin)){
        this.velocity.x = -this.velocity.x;
        this.position.x = poolGame.policy.leftBorderX + this.origin.x;
        collision = true;
    }
    else if(poolGame.policy.isXOutsideRightBorder(newPos, this.origin)){
        this.velocity.x = -this.velocity.x;
        this.position.x = poolGame.policy.rightBorderX - this.origin.x;
        collision = true;
    }

    if(poolGame.policy.isYOutsideTopBorder(newPos, this.origin)){
        this.velocity.y = -this.velocity.y;
        this.position.y = poolGame.policy.topBorderY + this.origin.y;
        collision = true;
    }
    else if(poolGame.policy.isYOutsideBottomBorder(newPos, this.origin)){
        this.velocity.y = -this.velocity.y;
        this.position.y = poolGame.policy.bottomBorderY - this.origin.y;
        collision = true;
    }

    return collision;
}

Ball.prototype.stop = function() {
  this.moving = false;
  this.velocity = Vector2.zero;
}

 
Ball.prototype.out = function() {
  
  this.position = new Vector2(0, 900);
  this.visible = false;
  this.inHole = true;

}

Ball.prototype.reset = function() {
  this.inHole = false;
  this.moving = false;
  this.velocity = Vector2.zero;
  this.position = this.initPos;
  this.visible = true;
}