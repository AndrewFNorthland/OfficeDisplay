//Configuration variables
var config = {
  maxMinis: 10,      //The maximum number of mini plots wanted to be displayed (will not scale when lower than 5)
  fontReduction: 53,     //The divisor to scale text according to window height
  showGrid: false,      //Choose whether to show the grid on the plot
  heightFactor: 0.8,     //The percentage of the height the main plot will occupy
  widthFactor: 0.6,      //The percentage of the width the main plot will occupy
  widthMiniFactor: 0.105,      //The percentage of the height a mini plot will occupy
  heightMiniFactor: 0.075,     //The percentage of the width a mini plot will occupy
  reductionFactor: 0.85,      //The percentage to reduce containers
  clearOnStop: false,     //Boolean, chooses whether or not to clear the selection rectangle on stopSelection

  //-------------Variables you will probably care about---------------
  defaultSelectionTimer: 3000,     //The default time the selection interval will wait before swithing, in milliseconds
  textColour: '#ffffff',     //The colour of text and axis in plots       Colours in HTML: #RRGGBB (RR = amount of red in hexadecimal, GG = green... BB = blue...)
  bgColour: '#000000',      //The colour of the background of plots
  selectedColour: '#ff0000',      //The colour of the selected mini plot
  miniLabels: ["Time", "Power"],     //Labels for the mini plot
  mainLabels: ["Time of Day (hr)", "Power (MW)"],     //Labels for the main plot (OVERWRITTEN BY INCOMING DATA)
  linesReserved: 7,     //The lines reserved in the data files for incoming plotting data
  stateNames: ['solarData', 'windData'],      //A lookup to get the state name
  numStates: 2      //The number of different types of power plant groups (2 right now, Phase 1 and 2 and Wind)
};
config.numStates = config.stateNames.length;

//Which power plants are being displayed
var state = 0; //0 = Phase 1 and 2 (Solar), 1 = Cochrane Plants (Solar), 2 = Wind

var selected = -1;
selectedData = {
  x1: [],
  y1: [],
  x2: [],
  y2: []
};

var data = solarData;
cochraneData = [];

instantiate();
startSelection();
