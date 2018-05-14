//Configuration variables
var config = {
  maxMinis: 100,      //The maximum number of mini plots wanted to be displayed (will not scale when lower than 5)
  showGrid: false,      //Choose whether to show the grid on the graph
  heightFactor: 0.8,     //The percentage of the height the main graph will occupy
  widthFactor: 0.6,      //The percentage of the width the main graph will occupy
  widthMiniFactor: 0.105,      //The percentage of the height a mini graph will occupy
  heightMiniFactor: 0.075,     //The percentage of the width a mini graph will occupy
  reductionFactor: 0.85,      //The percentage to reduce containers
  defaultSelectionTimer: 1000,     //The default time the selection interval will wait before swithing
  textColour: '#ffffff',     //The colour of text and axis in graphs
  clearOnStop: true,     //Boolean, chooses whether or not to clear the selection rectangle on stopSelection
  miniLabels: ["Time", "Power"],     //Labels for the mini plot
  mainLabels: ["Time of Day (min)", "Power (MW)"]     //Labels for the main plot
};


//Test data for graphing function
var selected = 0;
selectedData = {
  x1: [],
  y1: [],
  x2: [],
  y2: []
};

var data = liveData;

instantiate();
startSelection();


// data = [
//   [
//     [1, 2, 3, 4, 5],
//     [5, 4, 3, 2, 1]
//   ],
//   [
//     [3, 4, 5, 1, 2],
//     [2, 1, 3, 4, 5]
//   ],
//   [
//     [5, 1, 2, 4, 3],
//     [1, 2, 3, 4, 5]
//   ],
//   [
//     [3, 5, 1, 2, 4],
//     [1, 5, 2, 4, 3]
//   ],
//   [
//     [3, 5, 1, 2, 4],
//     [1, 5, 2, 4, 3]
//   ],
//   [
//     [3, 5, 1, 2, 4],
//     [1, 5, 2, 4, 3]
//   ],
//   [
//     [3, 5, 1, 2, 4],
//     [1, 5, 2, 4, 3]
//   ],
//   [
//     [3, 5, 1, 2, 4],
//     [1, 5, 2, 4, 3]
//   ],
//   [
//     [3, 5, 1, 2, 4],
//     [1, 5, 2, 4, 3]
//   ]
// ];
