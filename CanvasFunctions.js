var myCanvas;
var ctx;

//Creates the canvas for drawing on top of things
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

//Draws the selection of a mini plot to display as the main
function selectDraw(miniPlot) {
  if (!ctx)
    ctx = myCanvas.getContext("2d");

  clearCanvas();

  var yPos = $(window).height() * (1 - 2 * config.heightMiniFactor);
  var height = $(window).height() * (1.75 * config.heightMiniFactor);
  var width;
  if (!miniReduced)
    width = $(window).width() * config.widthMiniFactor;
  else
    width = $(window).width() * config.widthMiniFactor * config.reductionFactor;


  ctx.beginPath();
  ctx.strokeStyle="red";
  ctx.rect(miniPlot * width, yPos, width, height);
  ctx.stroke();
}
