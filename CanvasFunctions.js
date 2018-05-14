//-------------- The Canvas is only used for text overlay --------------

var myCanvas;
var ctx;

//Creates the canvas for drawing on top of things (used to draw selection rectangle)
function createCanvasOverlay() {
  myCanvas = document.createElement('canvas');
  document.body.appendChild(myCanvas);
  myCanvas.style.position = 'absolute';
  myCanvas.style.left="0px";
  myCanvas.style.top="0px";
  myCanvas.style.zIndex="100";
  myCanvas.style.width="100%";
  myCanvas.style.height="100%";
  myCanvas.width=myCanvas.offsetWidth;
  myCanvas.height=myCanvas.offsetHeight;
}

//Clears the canvas
function clearCanvas() {
  if (!ctx)
    ctx = myCanvas.getContext("2d");

  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
}

function displayInfo(selected) {
  for (var i = 5; i < data[selected].length; i++) {
    var text = "";
    for (var j = 0; j < data[selected][i].length; j++) {
      text += data[selected][i][j];
    }
    drawText(text, width() / 2.5,  getFontSize() * (i-4) + (i-5)*3);
  }
}

/*
A function to draw text on top of everything
Parameters:
  text - The text to draw
  x - The window's x-coordinate to draw
  y - The window's y-coordinate to draw
*/
function drawText(text, x, y) {
    if (!ctx)
      ctx = myCanvas.getContext("2d");

    ctx.font = getFontSize() + "px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y);
}

function getFontSize() {
  return Math.round(height()/config.fontReduction);
}


//----------------LEGACY FUNCTION (Not used anymore)-----------------------
//Draws the selection of a mini plot to display as the main
function selectDraw(miniPlot) {
  if (!ctx)
    ctx = myCanvas.getContext("2d");

  clearCanvas();

  // var yPos = $(window).height() * (1 - 2.75 * config.heightMiniFactor);
  var height = height() * (2.5 * config.heightMiniFactor);
  var width;
  if (!miniReduced)
    width = width() * config.widthMiniFactor;
  else
    width = width() * config.widthMiniFactor * config.reductionFactor;

  var pos = $('#'+miniPlot).position();

  ctx.beginPath();
  ctx.strokeStyle="red";
  // ctx.rect(miniPlot * width, yPos, width, height);
  ctx.rect(pos.left, pos.top, width, height);
  ctx.stroke();
}
