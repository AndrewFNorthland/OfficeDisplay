//Configuration variables
var config = {
  showGrid: false,      //Choose whether to show the grid on the graph
  heightFactor: 0.75,     //The percentage of the height the main graph will occupy
  widthFactor: 0.8      //The percentage of the width the main graph will occupy
};
//End

//Test data for graphing function
x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
y = [20, 356, 29, 1, 123, 421, 12, 2, 35, 100];

displayGraph(x, y, "Testing", ["X-Axis", "Y-Axis"]);
//End

/*
Generates and displays a graph for power or energy outputs.
Parameters:
  x - an array of unnormalized x values, often corresponding to a daily or monthly time in this context
  y - an array of unnormalized y values, often corresponding to power or energy in this context
  title - the title of the graph
  labels - an array of the axis labels where index 0 is x-axis and index 1 is y-axis
*/
function displayGraph(_x1, _y1, _title, _labels, _x2, _y2) {
  var set1 = {      //must be used as an array in Plotly.newPlot (even if only dataset)
    x: _x1,
    y: _y1,
    type: 'scatter'
  }

  var set2;
  if (_x2) {
    set2 = {      //must be used as an array in Plotly.newPlot (even if only dataset)
      x: _x2,
      y: _y2,
      type: 'scatter'
    }
  }

  var data;
  if (set2)
    data = [set1, set2];      //The array of all datasets for the current graph
  else
    data = [set1];

  var layout = {      //The specified layout of the current graph
    title: _title,
    xaxis: {
      title: _labels[0],
      showgrid: config.showGrid
    },
    yaxis: {
      title: _labels[1],
      showgrid: config.showGrid
    },
    width: $(window).width() * config.widthFactor,
    height: $(window).height() * config.heightFactor
  }

  Plotly.newPlot('main', data, layout);
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
