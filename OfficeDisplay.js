//Configuration variables
var config = {
  maxMinis: 6,
  showGrid: false,      //Choose whether to show the grid on the graph
  heightFactor: 0.655,     //The percentage of the height the main graph will occupy
  widthFactor: 0.5,      //The percentage of the width the main graph will occupy
  widthMiniFactor: 0.19,      //The percentage of the height a mini graph will occupy
  heightMiniFactor: 0.15,     //The percentage of the width a mini graph will occupy
  reductionFactor: 0.85
};


//Test data for graphing function
x = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59];
y = [366.922027587891,366.762084960938,367.030853271484,367.008636474609,367.245452880859,366.791503906250,366.659759521484,366.634765625000,366.609802246094,366.912689208984,366.559814453125,366.699981689453,366.940216064453,366.971771240234,367.031738281250,367.131500244141,366.669342041016,366.901092529297,367.150939941406,367.400817871094,367.339233398438,367.100006103516,367.500000000000,367.500000000000,367.500000000000,367.763549804688,367.810577392578,367.500000000000,367.843963623047, 367.883941650391,367.800292968750,367.808685302734,367.751586914063,367.699981689453,367.147888183594,367.114898681641,368.085845947266,367.861663818359,368.301483154297,368.668701171875,368.335510253906,368.348205566406,368.598114013672,368.392150878906,367.872436523438,367.545471191406,368.152740478516,368.381713867188,368.495941162109,368.511077880859,367.635375976563,368.035186767578,368.242401123047,368.399993896484,368.052307128906,367.732452392578,368.068481445313,368.075561523438,368.375396728516,368.675262451172,368.799987792969];

instantiateGraphs();

var i = 0;
setInterval(function() {
  i++;
  selectDraw(i%config.maxMinis);
}, 1000);

function instantiateGraphs() {
  displayGraph(x, y, "Testing", ["X-Axis", "Y-Axis"]);
  for (var i = 0; i < config.maxMinis; i++) {
    displayGraph(x, y, "Test" + i, ["X-Axis", "Y-Axis"], i)
  }

  reduceMiniSize();
  reduceMainSize();
  createCanvasOverlay();
}

function start
