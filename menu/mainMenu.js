function generateMainMenuLabels(headerText) {

  let labels = [
    
    new Label(
      headerText,
      new Vector2(360, 100),
      Vector2.zero,
      "white",
      "left",
      "Bookman",
      "100px"
    ),

    new Label(
      "GIVE YOUR BEST SHOT!!",
      new Vector2(1200, 700),
      Vector2.zero,
      "white",
      "left",
      "Bookman",
      "20px"
    )
  ];

  return labels;
}

function generateMainMenuButtons() {

  let buttons = [];

  buttons = buttons.concat([
    new Button(
      sprites.players_button,
      new Vector2(500, 300),
      function() {
        poolGame.mainMenu.active = false;
        GAME_STOPPED = false;
        setTimeout(poolGame.startNewGame, 200);
        sounds.fadeOut(poolGame.mainMenu.sound)
      },
      sprites.players_button_hover
    )
  ]);

  return buttons;
}