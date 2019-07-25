const DELTA = 1/177; //delta defines how much of the ball's velocity we add to the position of the ball in each iteration of the main loop

function GameWorld() {

  this.balls = CONSTANTS.ballsParams.map(params => new Ball(...params));
  
  this.yellowBalls = [
    this.balls[0],
    this.balls[1],
    this.balls[5],
    this.balls[6],
    this.balls[8],
    this.balls[12],
    this.balls[14]
  ];

  this.redBalls = [
    this.balls[2],
    this.balls[3],
    this.balls[7],
    this.balls[9],
    this.balls[10],
    this.balls[11],
    this.balls[13]
  ];

  this.blackBall = this.balls[4];

  this.whiteBall = this.balls[15];
  
  this.stick = new Stick(new Vector2(411, 413), this.whiteBall.shoot.bind(this.whiteBall));

  // this.gameOver = false;

  // this.table = {
  //   TopY: 57,
  //   RightX: 1443,
  //   BottomY: 768,
  //   LeftX: 57
  // }
}

GameWorld.prototype.getBallsSetByColor = function(color) {

  if(color === COLOR.red) {
    return this.redBalls;
  }
  if(color === COLOR.yellow) {
    return this.yellowBalls;
  }
  if(color === COLOR.black) {
    return this.blackBall;
  }
  if(color === COLOR.white) {
    return this.whiteBall;
  }
}

GameWorld.prototype.handleCollisions = function() {

  for(let i = 0; i < this.balls.length; i++) {

    // this.balls[i].handleBallInPocket();
    // this.balls[i].collideWithTable(this.table);
    for(let j = i + 1; j < this.balls.length; j++) {
      const firstBall = this.balls[i];
      const secondBall = this.balls[j];
      firstBall.collideWithBall(secondBall);
    }
  }
  
}

GameWorld.prototype.update = function() {

  this.handleCollisions();

  this.stick.update();

  for(let i = 0; i < this.balls.length; i++) {
    this.balls[i].update(DELTA);
  }

  if(!this.ballsMoving()) {
    poolGame.policy.updateTurnOutcome();
    if(poolGame.policy.foul) {
      this.ballInHand();
    }
  }
  

  if(!this.ballsMoving() && this.stick.shot) {
    this.stick.reposition(this.whiteBall.position);
  }
}

GameWorld.prototype.ballInHand = function() {
  MOUSE_INPUT_ON = false;
  setTimeout(() => {this.whiteBall.visible = true}, 100);
  this.stick.visible = false;
  if(!mouse.left.down) {
    this.whiteBall.position = mouse.position;
  } 
  else {
    let ballsOverlap = this.whiteBallOverlapsBalls();

    if(!poolGame.policy.isOutsideBorder(mouse.position, this.whiteBall.origin) &&
        !poolGame.policy.isInsideHole(mouse.position) &&
        !ballsOverlap) {
          mouse.reset();
          setTimeout(function() {MOUSE_INPUT_ON = true;}, 1000)
          
          
          this.whiteBall.position = mouse.position;
          this.whiteBall.inHole = false;
          poolGame.policy.foul = false;
          this.stick.position = this.whiteBall.position.copy();
          this.stick.visible = true;
        }

  }
}

GameWorld.prototype.whiteBallOverlapsBalls = function() {

  let ballsOverlap = false;
  for (var i = 0; i < this.balls.length; i++) {
    if(this.whiteBall !== this.balls[i]) {
      if(this.whiteBall.position.distanceFrom(this.balls[i].position) < BALL_SIZE) {
        ballsOverlap = true;
      }
    }
  }

  return ballsOverlap;
}

GameWorld.prototype.draw = function() {
  canvas.drawImage(sprites.background, {x: 0, y: 0});
  
  poolGame.policy.drawScores();

  for(let i = 0; i < this.balls.length; i++) {
    this.balls[i].draw();
  }

  this.stick.draw();

}

GameWorld.prototype.ballsMoving = function() {
  // return this.whiteBall.moving;

  let ballsMoving = false;

  for(let i = 0; i < this.balls.length; i++) {
    if(this.balls[i].moving) {
      ballsMoving = true;
      break;
    }
  }
  
  return ballsMoving;
}

GameWorld.prototype.reset = function() {
  // this.gameOver = false;

  for(var i = 0; i < this.balls.length; i++) {
    this.balls[i].reset();
  }

  this.stick.reset();
};