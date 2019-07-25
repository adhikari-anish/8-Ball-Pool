function Menu() {

}

Menu.prototype.init = function(backgroundSprite, labels, buttons, sound) {
  this.background = backgroundSprite;
  this.labels = labels || [];
  this.buttons = buttons || [];
  this.sound = sound ? sound : undefined;
  
  this.active = false;
}

Menu.prototype.load = function() {
  this.sound.currentTime = 0;
  this.active = true;
  requestAnimationFrame(this.menuLoop.bind(this));
  if(SOUND_ON) {
    this.sound.volume = 0.8;
  }

  this.sound.play();
}

Menu.prototype.draw = function() {
  
  canvas.cvs.style.cursor = "auto";

  canvas.drawImage(this.background, Vector2.zero, Vector2.zero, 0);

  for(let i = 0; i < this.labels.length; i++) {
    this.labels[i].draw();
    // console.log(this.labels[i])
  }

  for(let i = 0; i < this.buttons.length; i++) {
    this.buttons[i].draw();
  }
}

Menu.prototype.handleInput = function() {

  for(let i = 0; i < this.buttons.length; i++) {
    this.buttons[i].handleInput();
  }
}

Menu.prototype.menuLoop = function() {
  
  if(this.active) {
    this.handleInput();
    canvas.clearCanvas();
    this.draw();
    mouse.reset();
    requestAnimationFrame(this.menuLoop.bind(this));

  }
}