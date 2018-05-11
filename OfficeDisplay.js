//Configuration variables
var config = {
  maxMinis: 6,      //The maximum number of mini plots wanted to be displayed (will not scale when lower than 5)
  showGrid: false,      //Choose whether to show the grid on the graph
  heightFactor: 0.655,     //The percentage of the height the main graph will occupy
  widthFactor: 0.5,      //The percentage of the width the main graph will occupy
  widthMiniFactor: 0.19,      //The percentage of the height a mini graph will occupy
  heightMiniFactor: 0.15,     //The percentage of the width a mini graph will occupy
  reductionFactor: 0.85,      //The percentage to reduce containers
  defaultSelectionTimer: 1000,     //The default time the selection interval will wait before swithing
  textColour: '#ffffff'     //The colour of text and axis in graphs
};

var selectionInterval;

//Test data for graphing function
var selected = 0;
selectedData = {
  x: [],
  y: []
};

data = [
  [
    [1, 2, 3, 4, 5],
    [5, 4, 3, 2, 1]
  ],
  [
    [3, 4, 5, 1, 2],
    [2, 1, 3, 4, 5]
  ],
  [
    [5, 1, 2, 4, 3],
    [1, 2, 3, 4, 5]
  ],
  [
    [3, 5, 1, 2, 4],
    [1, 5, 2, 4, 3]
  ]
];

instantiate();
startSelection();
