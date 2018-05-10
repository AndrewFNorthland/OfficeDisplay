var miniReduced = false;
var mainReduced = false;

//Reduces the size of the main container (won't affect plot visual if only called once)
function reduceMainSize() {
  var plotContainers = document.getElementsByClassName("svg-container");

  var dim = getContainerDim(0, plotContainers);
  if (!mainReduced) {
    plotContainers[0].style.cssText = "position: relative; width: " + dim[0] * config.reductionFactor + "px; height: " + dim[1] + "px;";
  }
  mainReduced = true;
}

//Reduces the size of all mini containers (won't affect plot visual if only called once)
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
function cycleHistory() {
  var day = new Date();
  var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  setInterval(function() {
    day.setTime(day.getTime() - 86400000);
    document.getElementById("data").src = "../History/SolarPlot" + day.getFullYear() + months[day.getMonth()] + day.getDate() + ".png";
    console.log(day.getFullYear() + months[day.getMonth()] + day.getDate());
  }, 2000);
}

/*
Generates and displays a graph for power or energy outputs.
Parameters:
  _x1 - an array of unnormalized x values, often corresponding to a daily or monthly time in this context (actuals)
  _y1 - an array of unnormalized y values, often corresponding to power or energy in this context (actuals)
  _title - the title of the graph
  _labels - an array of the axis labels where index 0 is x-axis and index 1 is y-axis
  mini - the index of the mini graph this one is, set to -1 to set as main graph
  _x2 - an array of unnormalized x values, often corresponding to a daily or monthly time in this context (expected)
  _y2 - an array of unnormalized y values, often corresponding to power or energy in this context (expected)
*/
function displayGraph(_x1, _y1, _title, _labels, mini, _x2, _y2) {
  if (mini < 0 || mini > 9 || mini === undefined)
    mini = 'main';
  else
    mini = '' + mini;

  var set1 = {      //must be used as an array in Plotly.newPlot (even if only dataset)
    x: _x1,
    y: _y1,
    type: 'scatter',
    mode: 'lines',
    hoverinfo: 'none'
  }

  var set2;
  if (_x2) {
    set2 = {      //must be used as an array in Plotly.newPlot (even if only dataset)
      x: _x2,
      y: _y2,
      type: 'scatter',
      mode: 'lines',
      hoverinfo: 'none'
    }
  }

  var data;
  if (set2)
    data = [set1, set2];      //The array of all datasets for the current graph
  else
    data = [set1];

  var layout;
  if (mini == "main") {
    layout = {      //The specified layout of the current graph
      title: _title,
      xaxis: {
        title: _labels[0],
        showline: true,
        zeroline: false,
        showgrid: config.showGrid
      },
      yaxis: {
        title: _labels[1],
        showline: true,
        zeroline: false,
        showgrid: config.showGrid
      },
      width: $(window).width() * config.widthFactor,
      height: $(window).height() * config.heightFactor
    }
  } else {
    layout = {
      title: _title,
      xaxis: {
        showline: true,
        zeroline: false,
        showgrid: false
      },
      yaxis: {
        showline: true,
        zeroline: false,
        showgrid: false
      },
      width: $(window).width() * config.widthMiniFactor,
      height: $(window).width() * config.heightMiniFactor
    }
  }

  Plotly.newPlot(mini, data, layout);
}
