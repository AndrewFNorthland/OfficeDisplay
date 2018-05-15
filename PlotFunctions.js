
/*
-------------LIBRARY BEING USED IS PLOTLY.JS-------------
Reference: https://plot.ly/javascript/reference/
Examples: https://plot.ly/javascript/line-charts/
*/

/*
Generates and displays a graph for power or energy outputs.
Parameters:
  _x1 - an array of unnormalized x values, often corresponding to a daily or monthly time in this context (actuals)
  _y1 - an array of unnormalized y values, often corresponding to power or energy in this context (actuals)
  _title - the title of the graph
  _labels - an array of the axis labels where index 0 is x-axis and index 1 is y-axis
  update - boolean, whether this function is updating a graph or creating it
  mini - the index of the mini graph this one is, set to -1 to set as main graph
  selected - boolean, true if this is the mini selected to be displayed as main
  _x2 - an array of unnormalized x values, often corresponding to a daily or monthly time in this context (expected)
  _y2 - an array of unnormalized y values, often corresponding to power or energy in this context (expected)
*/
function displayPlot(_x1, _y1, _title, _labels, update, mini, selected, _x2, _y2) {
  if (mini < 0 || mini > 9 || mini === undefined)     //Determining if creating a mini graph or not
    mini = 'main';
  else
    mini = '' + mini;

  //set1 and set2 are data sets
  var set1 = {      //must be used as an array in Plotly.newPlot (even if only dataset)
    x: _x1,
    y: _y1,
    mode: 'lines',
    type: 'scatter',
    hoverinfo: 'none',
    name: 'Actual'
  }

  var set2;
  if (_x2) {      //only setting set2 if there is data for it
    set2 = {
      x: _x2,
      y: _y2,
      type: 'scatter',
      mode: 'lines',
      hoverinfo: 'none',
      name: 'Expected'
    }
  }

  var data;      //The array of all datasets for the current graph
  if (set2)     //Only putting set2 into the data array if it exists
    data = [set1, set2];
  else
    data = [set1];

  var layout;     //The template for each kind of plot, created in functions below
  if (mini == "main") {
    layout = mainLayout(_title, _labels);
  } else {
    layout = miniLayout(_title, selected);
  }

  if (update) {
    Plotly.react(mini, data, layout);     //To update a plot (more computationaly efficient)
  } else {
    Plotly.newPlot(mini, data, layout);     //To create a new plot (only used on startup)
  }
}

function clearAllMinis() {
  for (var i = 0; i < config.maxMinis; i++) {
    Plotly.purge('' + i);
  }
}

//Returns the layout for the main graph, everything here is optimized to display with our setup
function mainLayout(_title, _labels) {
  return {
    title: _title,
    titlefont: {
      color: config.textColour
    },
    plot_bgcolor: config.bgColour,      //background of the plot
    paper_bgcolor: config.bgColour,     //background of the border
    margin: {     //setting the border thickness
      l: 75,
      r: 50,
      t: 50,
      b: 75
    },
    xaxis: {
      title: _labels[0],
      titlefont: {
        color: config.textColour
      },
      range: [0, 24],
      backgroundcolor: config.bgColour,
      showbackground: true,
      showline: true,
      linecolor: config.textColour,     //axis line
      ticks: 'inside',      //ticks on axis line
      tickcolor: config.textColour,
      tickfont: {     //numbers on the ticks
        color: config.textColour
      },
      zeroline: false,
      showgrid: config.showGrid
    },
    yaxis: {
      title: _labels[1],
      titlefont: {
        color: config.textColour
      },
      range: [0, config.yRange],
      backgroundcolor: config.bgColour,
      showbackground: true,
      showline: true,
      linecolor: config.textColour,
      ticks: 'inside',
      tickcolor: config.textColour,
      tickfont: {
        color: config.textColour
      },
      zeroline: false,
      showgrid: config.showGrid
    },
    width: width() * config.widthFactor,
    height: height() * config.heightFactor
  }
}

//Returns the layout for the mini graph, everything here is optimized to display with our setup
function miniLayout(_title, selected) {
  if (selected == true) {
    selected = config.selectedColour;
  } else {
    selected = config.textColour;
  }

  return {
    title: _title,
    plot_bgcolor: config.bgColour,
    paper_bgcolor: config.bgColour,
    margin: {
      l: 25,
      r: 25,
      t: 25,
      b: 25
    },
    showlegend: false,
    titlefont: {
      color: selected
    },
    xaxis: {
      range: [0, 24],
      showline: true,
      linecolor: selected,
      ticks: 'inside',
      tickcolor: selected,
      tickfont: {
        color: selected
      },
      zeroline: false,
      showgrid: false
    },
    yaxis: {
      range: [0, config.yRange],
      showline: true,
      linecolor: selected,
      ticks: 'inside',
      tickcolor: selected,
      tickfont: {
        color: selected
      },
      zeroline: false,
      showgrid: false
    },
    width: width() * config.widthMiniFactor,
    height: width() * config.heightMiniFactor
  }
}

//------------------- LEGACY FUNCTIONS -------------- (They are no longer used)

var miniReduced = false;
var mainReduced = false;

//Reduces the size of the main container (won't affect plot visual if only called once)
//--------------------------LEGACY FUNCTION, NO LONGER USED---------------------------------------
function reduceMainSize() {
  var plotContainers = document.getElementsByClassName("svg-container");

  var dim = getContainerDim(0, plotContainers);
  if (!mainReduced) {
    plotContainers[0].style.cssText = "position: relative; width: " + dim[0] * config.reductionFactor + "px; height: " + dim[1] + "px;";
  }
  mainReduced = true;
}

//Reduces the size of all mini containers (won't affect plot visual if only called once)
//--------------------------LEGACY FUNCTION, NO LONGER USED---------------------------------------
function reduceMiniSize() {
  var plotContainers = document.getElementsByClassName("svg-container");

  var dim = getContainerDim(1, plotContainers);

  if (!miniReduced) {
    for (var i = 1; i < plotContainers.length; i++) {
      plotContainers[i].style.cssText = "position: relative; width: " + dim[0] * config.reductionFactor + "px; height: " + dim[1] + "px;";
    }
  }
  miniReduced = true;
}

/*
Gets the dimensions of the container of a certain plot
Parameters:
  plot - the plot number to get (0 = main, 1 = leftmost mini, 2 = second leftmost mini)
  plotContainers - an array of the plot containers found with document.getElementsByClassName("svg-container")
*/
//--------------------------LEGACY FUNCTION, NO LONGER USED---------------------------------------
function getContainerDim(plot, plotContainers) {
  var dim = [];

  var num = "";
  var i = 27;
  var a = plotContainers[plot].style.cssText.charAt(i);
  while (a >= '0' && a <= '9') {
    num += a;
    a = plotContainers[plot].style.cssText.charAt(++i);
  }
  dim.push(parseInt(num));

  num = "";
  while (plotContainers[plot].style.cssText.charAt(i) < '0' || plotContainers[plot].style.cssText.charAt(i) > '9') {
    i++;
  }
  a = plotContainers[plot].style.cssText.charAt(i);
  while (a >= '0' && a <= '9') {
    num += a;
    a = plotContainers[plot].style.cssText.charAt(++i);
  }
  dim.push(parseInt(num));

  return dim;
}

//Cycles through the history folder on the ftp server (just a test function for image display and local access)
//--------------------------LEGACY FUNCTION, NO LONGER USED---------------------------------------
function cycleHistory() {
  var day = new Date();
  var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  setInterval(function() {
    day.setTime(day.getTime() - 86400000);
    document.getElementById("data").src = "../History/SolarPlot" + day.getFullYear() + months[day.getMonth()] + day.getDate() + ".png";
    console.log(day.getFullYear() + months[day.getMonth()] + day.getDate());
  }, 2000);
}
