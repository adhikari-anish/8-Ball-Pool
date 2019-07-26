function GamePolicy() {

  this.turn = 0;
  this.firstCollision = true;
  let player1TotalScore = new Score(new Vector2(675, 367.5));
  let player2TotalScore = new Score(new Vector2(825, 367.5));

  let player1MatchScore = new Score(new Vector2(470, 108));
  let player2MatchScore = new Score(new Vector2(1030, 108));

  this.players = [new Player(player1MatchScore, player1TotalScore), new Player(player2MatchScore, player2TotalScore)];
  this.foul = false;
  this.scored = false;
  this.won = false;
  this.turnPlayed = false;
  this.validBallsInsertedOnTurn = 0;

  this.leftBorderX = BORDER_SIZE;
  this.rightBorderX = 1443;
  this.topBorderY = BORDER_SIZE;
  this.bottomBorderY = 768;

  this.topCenterHolePos = new Vector2(750, 32);
  this.bottomCenterHolePos = new Vector2(750,794);
  this.topLeftHolePos = new Vector2(62,62);
  this.topRightHolePos = new Vector2(1435,62);
  this.bottomLeftHolePos = new Vector2(62,762)
  this.bottomRightHolePos = new Vector2(1435,762);
}

GamePolicy.prototype.reset = function() {
  this.turn = 0;
  this.players[0].matchScore.value = 0;
  this.players[0].color = undefined;
  this.players[1].matchScore.value = 0;
  this.players[1].color = undefined;
  this.foul = false;
  this.scored = false;
  this.turnPlayed = false;
  this.won = false;
  this.firstCollision = true;
  this.validBallsInsertedOnTurn = 0;
}

GamePolicy.prototype.drawScores = function() {
  canvas.drawText("PLAYER " + (this.turn + 1), new Vector2(790, 200), new Vector2(150, 0), "#074523", "top", "Impact", "70px");
  this.players[0].totalScore.draw(); 
  this.players[1].totalScore.draw();

  this.players[0].matchScore.drawLines(this.players[0].color);
  this.players[1].matchScore.drawLines(this.players[1].color);
}

GamePolicy.prototype.checkColisionValidity = function(ball1, ball2) {
  let currentPlayerColor = this.players[this.turn].color;

  if(this.players[this.turn].matchScore.value == 7 &&
    (ball1.color == COLOR.black || ball2.color == COLOR.black)) {
      this.firstCollision = false;
      return;
    }

  if(!this.firstCollision) 
    return;
  
    if(currentPlayerColor == undefined) {
      this.firstCollision = false;
      return;
    }

    if(ball1.color == COLOR.white) {
      if(ball2.color != currentPlayerColor) {
        this.foul = true;
      }
      this.firstCollision = false;
    }

    if(ball2.color == COLOR.white) {
      if(ball1.color != currentPlayerColor) {
        this.foul = true;
      }
      this.firstCollision = false;
    }
}

GamePolicy.prototype.handleBallInHole = function(ball) {

  setTimeout(function(){ball.out();}, 100);

  let currentPlayer = this.players[this.turn];
  let secondPlayer = this.players[(this.turn + 1) % 2];

  if(currentPlayer.color == undefined) {
    if(ball.color === COLOR.red) {
      currentPlayer.color = COLOR.red;
      secondPlayer.color = COLOR.yellow;
    }
    else if(ball.color === COLOR.yellow) {
      currentPlayer.color = COLOR.yellow;
      secondPlayer.color = COLOR.red;
    }
    else if(ball.color === COLOR.black) {
      this.won = true;
      this.foul = true;
    }
    else if(ball.color === COLOR.white) {
      this.foul = true;
    }
  }

  if(currentPlayer.color === ball.color) {
    currentPlayer.matchScore.increment();
    this.scored = true;
    this.validBallsInsertedOnTurn++;
  }
  else if(ball.color === COLOR.white) {

    if(currentPlayer.color != undefined) {
      this.foul = true;

      let ballsSet = poolGame.gameWorld.getBallsSetByColor(currentPlayer.color);

      let allBallsInHole = true;

      for (var i = 0; i < ballsSet.length; i++) {
        if(!ballsSet[i].inHole) {
          allBallsInHole = false;
        }
      }

      if(allBallsInHole) {
        this.won = true;
      }
    }
  }
  else if(ball.color === COLOR.black) {

    if(currentPlayer.color != undefined) {
      let ballsSet = poolGame.gameWorld.getBallsSetByColor(currentPlayer.color);

      for (var i = 0; i < ballsSet.length; i++) {
        if(!ballsSet[i].inHole) {
          this.foul = true;
        }
      }

      this.won = true;
    }
  }

  else {
    secondPlayer.matchScore.increment();
    this.foul = true;
  }

}

GamePolicy.prototype.switchTurns = function() {
  this.turn++;
  this.turn %= 2;
}

GamePolicy.prototype.updateTurnOutcome = function() {

  if(!this.turnPlayed) {
    return;
  }


  if(this.firstCollision == true) {
    this.foul = true;
  }

  if(this.won) {

    if(!this.foul) {
      this.players[this.turn].totalScore.increment();
      this.reset();
      setTimeout(function() {poolGame.gameWorld.reset();
      }, 1000);
    }
    else {
      this.players[(this.turn + 1) % 2].totalScore.increment();
      this.reset();
      setTimeout(function() {poolGame.gameWorld.reset();
      }, 1000);
    }
    return;
  }

  if(!this.scored || this.foul)
    this.switchTurns();
  
  this.scored = false;
  this.turnPlayed = false;
  this.firstCollision = true;
  this.validBallsInsertedOnTurn = 0;
}

GamePolicy.prototype.handleFoul = function() {

  if(!mouse.left.down) {
    poolGame.gameWorld.whiteBall.position = mouse.position;
  }
}

GamePolicy.prototype.isXOutsideLeftBorder = function(pos, origin){
  return (pos.x - origin.x) < this.leftBorderX;
}
GamePolicy.prototype.isXOutsideRightBorder = function(pos, origin){
  return (pos.x + origin.x) > this.rightBorderX;
}
GamePolicy.prototype.isYOutsideTopBorder = function(pos, origin){
  return (pos.y - origin.y) < this.topBorderY;
}
GamePolicy.prototype.isYOutsideBottomBorder = function(pos , origin){
  return (pos.y + origin.y) > this.bottomBorderY;
}

GamePolicy.prototype.isOutsideBorder = function(pos,origin){
  return this.isXOutsideLeftBorder(pos,origin) || this.isXOutsideRightBorder(pos,origin) || 
  this.isYOutsideTopBorder(pos, origin) || this.isYOutsideBottomBorder(pos , origin);
}

GamePolicy.prototype.isInsideTopLeftHole = function(pos) {
  return this.topLeftHolePos.distanceFrom(pos) < HOLE_RADIUS;
}

GamePolicy.prototype.isInsideTopRightHole = function(pos){
  return this.topRightHolePos.distanceFrom(pos) < HOLE_RADIUS;
}

GamePolicy.prototype.isInsideBottomLeftHole = function(pos){
  return this.bottomLeftHolePos.distanceFrom(pos) < HOLE_RADIUS;
}

GamePolicy.prototype.isInsideBottomRightHole = function(pos){
  return this.bottomRightHolePos.distanceFrom(pos) < HOLE_RADIUS;
}

GamePolicy.prototype.isInsideTopCenterHole = function(pos){
  return this.topCenterHolePos.distanceFrom(pos) < (HOLE_RADIUS + 6);
}

GamePolicy.prototype.isInsideBottomCenterHole = function(pos){
  return this.bottomCenterHolePos.distanceFrom(pos) < (HOLE_RADIUS + 6);
}

GamePolicy.prototype.isInsideHole = function(pos){
  return this.isInsideTopLeftHole(pos) || this.isInsideTopRightHole(pos) || 
         this.isInsideBottomLeftHole(pos) || this.isInsideBottomRightHole(pos) ||
         this.isInsideTopCenterHole(pos) || this.isInsideBottomCenterHole(pos);
}
