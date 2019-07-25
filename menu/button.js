function Button(sprite, position, callback, hoverSprite) {

  this.sprite = sprite;
  this.hoverSprite = hoverSprite ? hoverSprite : sprite;
  // console.log(this.hoverSprite)
  this.position = position;
  this.callback = callback;
}

Button.prototype.draw = function() {

  if(this.mouseInsideBorders()) {
    canvas.drawImage(this.hoverSprite, this.position, Vector2.zero, 0);
    canvas.cvs.style.cursor = "pointer";
  }

  else {
    canvas.drawImage(this.sprite, this.position, Vector2.zero, 0);
  }


    // MyCanvas.prototype.drawImage = function(image, position, origin, rotation = 0) {
  // }
}

Button.prototype.handleInput = function() {

  if(mouse.left.pressed && this.mouseInsideBorders()) {
    this.callback();
  }
}

Button.prototype.mouseInsideBorders = function() {
  mousePos = mouse.position;

  if(mousePos.x > this.position.x
    &&
    mousePos.x < this.position.x + this.sprite.width
    &&
    mousePos.y > this.position.y
    &&
    mousePos.y < this.position.y + this.sprite.height
    ) {
      return true;
    }

    return false;

}