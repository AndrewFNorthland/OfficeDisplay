var selectionInterval;

//The primary initialization for the Plots and Canvas
//Required to run at beginning of program
function instantiate() {
  displayPlot(selectedData.x, selectedData.y, "Testing", ["X-Axis", "Y-Axis"], false);
  for (var i = 0; i < data.length && i < config.maxMinis; i++) {
    displayPlot(data[i][0], data[i][1], "Test" + i, ["X-Axis", "Y-Axis"], false, i);
  }

  // createCanvasOverlay();
}

//Redraws the plots to update their data, also used to set which dataset goes to the main plot
function redraw(selected) {
  displayPlot(selectedData.x1, selectedData.y1, "Hello", ["Test1", "Test2"], true, 'main', false, selectedData.x2, selectedData.y2);
  for (var i = 0; i < data.length && i < config.maxMinis; i++) {
    if (i == selected)
      displayPlot(data[i][0], data[i][1], "Test" + i, ["X-Axis", "Y-Axis"], false, i, true, data[i][1], data[i][0]);
    else
      displayPlot(data[i][0], data[i][1], "Test" + i, ["X-Axis", "Y-Axis"], false, i, false, data[i][1], data[i][0]);
  }
}

/*
Starts the cycle which selects different plots to be displayed as the main.
Parameters:
  time - the time delay between selections
*/
function startSelection(time) {
  if (!time)
    time = config.defaultSelectionTimer;

  selectionInterval = setInterval(function() {
    selectedData.x1 = data[selected][0];
    selectedData.y1 = data[selected][1];
    selectedData.x2 = data[selected][1];
    selectedData.y2 = data[selected][0];

    // selectDraw(selected);
    redraw(selected);

    selected++;
    selected = selected % data.length;
  }, time);
}

//Stops the selection cycle
function stopSelection() {
  clearInterval(selectionInterval);
  if (config.clearOnStop)
    clearCanvas();
}
