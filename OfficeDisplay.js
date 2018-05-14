//Configuration variables
var config = {
  maxMinis: 10,      //The maximum number of mini plots wanted to be displayed (will not scale when lower than 5)
  showGrid: false,      //Choose whether to show the grid on the plot
  heightFactor: 0.8,     //The percentage of the height the main plot will occupy
  widthFactor: 0.6,      //The percentage of the width the main plot will occupy
  widthMiniFactor: 0.105,      //The percentage of the height a mini plot will occupy
  heightMiniFactor: 0.075,     //The percentage of the width a mini plot will occupy
  reductionFactor: 0.85,      //The percentage to reduce containers
  defaultSelectionTimer: 1000,     //The default time the selection interval will wait before swithing
  textColour: '#ffffff',     //The colour of text and axis in plots       Colours in HTML: #RRGGBB (RR = amount of red in hexadecimal, GG = green... BB = blue...)
  bgColour: '#000000',      //The colour of the background of plots
  selectedColour: '#ff0000',      //The colour of the selected mini plot
  clearOnStop: true,     //Boolean, chooses whether or not to clear the selection rectangle on stopSelection
  miniLabels: ["Time", "Power"],     //Labels for the mini plot
  mainLabels: ["Time of Day (hr)", "Power (MW)"],     //Labels for the main plot
  fontReduction: 53,     //The divisor to scale text according to window height
  yRange: 15      //The definite range the y-axis will be set to
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
displayInfo(selected);
