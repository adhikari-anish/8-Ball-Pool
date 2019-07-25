let sprites = {};
let sounds = {};
let assetsStillLoading = 0;

function assetsLoadingLoop(callback) {
  if(assetsStillLoading) {
    requestAnimationFrame(() => {
      
      assetsLoadingLoop(callback);
    });
  } else {
    callback();
    requestAnimationFrame(poolGame.mainMenu.load.bind(poolGame.mainMenu));
  }
}

function loadAssets(callback) {     //once this function finishes to load all assets this callback function gets activated

  function loadSprite(fileName) {
    assetsStillLoading++;

    let spriteImage = new Image();
    spriteImage.src = 'images/' + fileName;

    spriteImage.onload = function() {
      assetsStillLoading--;
    }
    

    return spriteImage;
  }

  var loadSound = function(sound) {
    return new Audio("sounds/" + sound);
  }

  sprites.background = loadSprite('spr_background4.png');
  sprites.stick = loadSprite('spr_stick.png');
  sprites.whiteBall = loadSprite('spr_ball2.png');
  sprites.redBall = loadSprite('spr_redBall2.png');
  sprites.yellowBall = loadSprite('spr_yellowBall2.png');
  sprites.blackBall = loadSprite('spr_blackBall2.png');
  sprites.players_button = loadSprite('2_players_button.png');
  sprites.players_button_hover = loadSprite('2_players_button_hover.png');
  sprites.mainMenuBackground = loadSprite('main_menu_background.png');

  sounds.side = loadSound("Side.wav");
  sounds.ballsCollide = loadSound("BallsCollide.wav");
  sounds.strike = loadSound("Strike.wav");
  sounds.hole = loadSound("Hole.wav");
  sounds.jazzTune = loadSound("Bossa Antigua.mp3");

  assetsLoadingLoop(callback); 
}  

function getBallSpriteByColor(color) {
  switch(color) {
    case COLOR.red:
      return sprites.redBall;
    case COLOR.yellow:
      return sprites.yellowBall;
    case COLOR.black:
      return sprites.blackBall;
    case COLOR.white:
      return sprites.whiteBall;
  }
}

sounds.fadeOut = function(sound) {
  
  var fadeAudio = setInterval(function() {
    if(GAME_STOPPED)
      return;

    if((sound.volume >= 0.05)) {
      sound.volume -= 0.05;
    }

    else {
      sound.pause();
      clearInterval(fadeAudio);
    }
  }, 400);
}

