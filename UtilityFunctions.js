var selectionInterval;

//The primary initialization for the Plots and Canvas
//Required to run at beginning of program
function instantiate() {
  displayPlot(selectedData.x, selectedData.y, "Site: ", config.mainLabels, false, 'main', selectedData.x2, selectedData.y2);
  for (var i = 0; i < data.length && i < config.maxMinis; i++) {
    displayPlot(data[i][0], data[i][1], "Test" + i, config.miniLabels, false, i, selectedData.x2, selectedData.y2);
  }

  // createCanvasOverlay();
}

//Redraws the plots to update their data, also used to set which dataset goes to the main plot
function redraw(selected) {
  displayPlot(selectedData.x1, selectedData.y1, "SITE_NAME", config.mainLabels, true, 'main', false, selectedData.x2, selectedData.y2);
  for (var i = 0; i < data.length && i < config.maxMinis; i++) {
    displayPlot(data[i][0], data[i][1], "SITE_NAME_" + i, config.miniLabels, false, i, i == selected, selectedData.x2, selectedData.y2);
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
    data = liveData;
    selectedData.x1 = data[selected][0];
    selectedData.y1 = data[selected][1];
    selectedData.x2 = data[selected][2];
    selectedData.y2 = data[selected][3];

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
