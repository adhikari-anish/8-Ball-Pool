function handleMouseMove(e) {
  let x = e.pageX;
  let y = e.pageY;

  mouse.position = new Vector2(x,y);
}

function handleMouseDown(e) {
  handleMouseMove(e);

  if(e.which === 1) {
    if(!mouse.left.down) {
      mouse.left.pressed = true;
    }
    mouse.left.down = true;
  } else if(e.which === 2) {
      if(!mouse.middle.down) {
        mouse.middle.pressed = true;
      }
      mouse.middle.down = true;
  } else if(e.which === 3) {
      if(!mouse.right.down) {
        mouse.right.pressed = true;
      }
      mouse.right.down = true;
  }
}

function handleMouseUp(e) {
  handleMouseMove(e);

  if(e.which === 1) {
    mouse.left.down = false;
  } else if(e.which === 2) {
    mouse.middle.down = false;
  } else if(e.which === 3) {
    mouse.right.down = false;
  }
}

function MouseHandler() { //here we will handle mouse input
  this.left = new ButtonState();
  this.middle = new ButtonState();
  this.right = new ButtonState();

  this.position = new Vector2();

  document.onmousemove = handleMouseMove;
  document.onmousedown = handleMouseDown;
  document.onmouseup = handleMouseUp;
}

MouseHandler.prototype.reset = function() {
  this.left.pressed = false;
  this.right.pressed = false;
  this.middle.pressed = false;
}

let mouse = new MouseHandler();