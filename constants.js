const CONSTANTS = {

  ballsParams: [
    [new Vector2(1022, 413), COLOR.yellow],
    [new Vector2(1056, 393), COLOR.yellow],
    [new Vector2(1056, 433), COLOR.red],
    [new Vector2(1090, 374), COLOR.red],
    [new Vector2(1090, 413), COLOR.black],
    [new Vector2(1090, 452), COLOR.yellow],
    [new Vector2(1126, 354), COLOR.yellow],
    [new Vector2(1126, 393), COLOR.red],
    [new Vector2(1126, 433), COLOR.yellow],
    [new Vector2(1126, 472), COLOR.red],
    [new Vector2(1162, 335), COLOR.red],
    [new Vector2(1162, 374), COLOR.red],
    [new Vector2(1162, 413), COLOR.yellow],
    [new Vector2(1162, 452), COLOR.red],
    [new Vector2(1162, 491), COLOR.yellow],
    [new Vector2(413, 413), COLOR.white]
  ],

  // Ball
  ballOrigin: new Vector2(25, 25),

  // Table
  pocketRadius: 46,
  pockets: [
    new Vector2(750, 32),
    new Vector2(750, 794),
    new Vector2(62, 62),
    new Vector2(1435, 62),
    new Vector2(62, 762),
    new Vector2(1435, 762)
  ]

}

const BALL_SIZE = 38;
const BORDER_SIZE = 57;
const HOLE_RADIUS = 46;

let MOUSE_INPUT_ON = true;

let DISPLAY = true;
let GAME_STOPPED = true;

let SOUND_ON = true;