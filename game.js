function Game() {
  this.gameWorld = undefined;

  this.sound = true;
  this.mainMenu = new Menu();
}

Game.prototype.init = function() {  //initialize the game
  this.gameWorld = new GameWorld();
  this.policy = new GamePolicy();

  this.initMenus();
}

Game.prototype.initMenus = function() {

  let labels = generateMainMenuLabels("Classic 8-Ball-Pool");

  let buttons = generateMainMenuButtons();

  this.mainMenu.init
  (
    sprites.mainMenuBackground,
    labels,
    buttons,
    sounds.jazzTune
  );
}

Game.prototype.start = function() { //starts the game
  this.init();
}

Game.prototype.startNewGame = function() {
  canvas.cvs.style.cursor = "auto";

  poolGame.gameWorld = new GameWorld();
  poolGame.policy = new GamePolicy();

  canvas.clearCanvas();
  
  setTimeout( () => {
    poolGame.mainLoop();
  }, 0000);
}

Game.prototype.mainLoop = function() {

  if(DISPLAY && !GAME_STOPPED) {
    canvas.clearCanvas();
    this.gameWorld.update();
    this.gameWorld.draw();
    mouse.reset();
    requestAnimationFrame(this.mainLoop.bind(this)); 
  }
  
}

let poolGame = new Game();