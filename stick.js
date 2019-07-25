const STICK_ORIGIN = new Vector2(970, 11);
const STICK_SHOT_ORIGIN = new Vector2(950, 11);
const MAX_POWER = 7500;

function Stick(position, onShoot) {
  this.position = position;
  this.rotation = 0;
  this.origin = STICK_ORIGIN.copy();
  this.power = 0;
  this.onShoot = onShoot;
  this.shot = false;
  this.visible = true;
}

Stick.prototype.update = function() {

  if(poolGame.policy.turnPlayed)
    return;

  if(this.shot) {
    return;
  }

  if(mouse.left.down && MOUSE_INPUT_ON) {
    this.increasePower();
  } else if(this.power > 0 && !mouse.left.down){
    this.shoot();
    poolGame.policy.turnPlayed = true;
  }

  this.updateRotation();

}


Stick.prototype.updateRotation = function() {
  let opposite = mouse.position.y - this.position.y;
  let adjacent = mouse.position.x - this.position.x;

  this.rotation = Math.atan2(opposite, adjacent);
}

Stick.prototype.increasePower = function() {

  if(this.power > MAX_POWER) {
    return;
  }
  this.power += 120;
  this.origin.x += 5;
}

Stick.prototype.shoot = function() {

  if(poolGame.sound && SOUND_ON) {
    var strike = sounds.strike.cloneNode(true);
    strike.play();
  }

  this.onShoot(this.power, this.rotation);
  this.power = 0;
  this.origin = STICK_SHOT_ORIGIN.copy();
  this.shot = true;
  poolGame.policy.turnPlayed = true;
  var stick = this;
  setTimeout(function() {stick.visible = false;}, 500);
}

Stick.prototype.reposition = function(position) { //parameter pos is of ball
  this.position = position.copy();
  this.origin = STICK_ORIGIN.copy();
  this.visible = true;
  this.shot = false;
}


Stick.prototype.draw = function() {
  if(!this.visible)
    return;
  canvas.drawImage(sprites.stick, this.position, this.origin, this.rotation);


  //drawing guide
  canvas.ctx.setLineDash([16, 16]);
  canvas.ctx.beginPath();
  canvas.ctx.moveTo(this.position.x, this.position.y);
  canvas.ctx.lineTo(mouse.position.x, mouse.position.y);
  canvas.ctx.strokeStyle = '#ffffff';
  canvas.ctx.stroke();
}

Stick.prototype.reset = function() {
  this.position.x = poolGame.gameWorld.whiteBall.position.x;
  this.position.y = poolGame.gameWorld.whiteBall.position.y;
  this.origin = STICK_ORIGIN.copy();
  this.shot = false;
  this.power = 0;
  this.visible = true;
}