function Score(position) {
  this.position = position;
  this.origin = new Vector2(50, 95);
  this.value = 0;
}

Score.prototype.reset - function() {
  this.position = position;
  this.origin = new Vector2(30, 0);
  this.value = 0;
};

Score.prototype.draw = function() {
  canvas.drawText(
    this.value,
    this.position,
    this.origin,
    "#096834",
    "top",
    "Impact",
    "200px"
  );
};

Score.prototype.drawLines = function(color) {
  for(let i=0; i<this.value; i++) {

    let pos = this.position.add(new Vector2(i * 15, 0));

    canvas.drawText(
      "I",
      pos,
      this.origin,
      color,
      "top",
      "Arial",
      "40px"
    );
  }
};

Score.prototype.increment = function() {
  this.value++;
};