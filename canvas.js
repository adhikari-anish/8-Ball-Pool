function MyCanvas(width, height) {
  this.cvs = document.getElementById('canvas');
  this.cvs.width = width;
  this.cvs.height = height;
  this.ctx = this.cvs.getContext('2d');
}

MyCanvas.prototype.clearCanvas = function() {
  this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
}

MyCanvas.prototype.drawImage = function(image, position, origin, rotation = 0) {

  if(!position) {
    position = new Vector2();
  }

  if(!origin) {
    origin = new Vector2();
  }

  this.ctx.save();
  this.ctx.translate(position.x, position.y);
  this.ctx.rotate(rotation);
  this.ctx.drawImage(image, -origin.x, -origin.y);
  this.ctx.restore();
};

MyCanvas.prototype.drawText = function (text, position, origin, color, textAlign, fontname, fontsize) {
  position = typeof position !== 'undefined' ? position : Vector2.zero;
  origin = typeof origin !== 'undefined' ? origin : Vector2.zero;
  color = typeof color !== 'undefined' ? color : "#000000";
  textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
  fontname = typeof fontname !== 'undefined' ? fontname : "sans-serif";
  fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";

  this.ctx.save();
  this.ctx.translate(position.x - origin.x, position.y - origin.y)
  this.ctx.textBaseline = 'top';
  this.ctx.font = fontsize + " " + fontname;
  this.ctx.fillStyle = color;
  this.ctx.textAlign = textAlign;
  this.ctx.fillText(text, 0, 0);
  this.ctx.restore();
};

let canvas = new MyCanvas(1500, 825);


// function resize() {
//   var height = window.innerHeight;

//   var ratio = canvas.cvs.width / canvas.cvs.height;

//   var width = height * ratio;

//   canvas.cvs.style.width = width + 'px';
//   canvas.cvs.style.height = height + 'px';

  
// }

// window.addEventListener('load', resize, false);
// window.addEventListener('resize', resize, false);

// var scale = 'scale(0.6)';
// // document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
// //  document.body.style.msTransform =   scale;       // IE 9
//  document.body.style.transform = scale;     // General

//  var translate = 'translate(0px, 0px)'
//  document.body.style.transform = translate;

