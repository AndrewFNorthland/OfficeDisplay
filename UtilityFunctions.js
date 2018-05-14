var selectionInterval;

//The primary initialization for the Plots and Canvas
//Required to run at beginning of program
function instantiate() {
  displayPlot(selectedData.x, selectedData.y, "", config.mainLabels, false, 'main', false, selectedData.x2, selectedData.y2);
  for (var i = 0; i < data.length && i < config.maxMinis; i++) {
    displayPlot(data[i][1], data[i][2], "", config.miniLabels, false, i, false, data[i][3], data[i][4]);
  }

  createCanvasOverlay();
}

//Redraws the plots to update their data, also used to set which dataset goes to the main plot
function redraw(selected) {
  displayPlot(selectedData.x1, selectedData.y1, data[selected][0][0], config.mainLabels, true, 'main', false, selectedData.x2, selectedData.y2);
  for (var i = 0; i < data.length && i < config.maxMinis; i++) {
    displayPlot(data[i][1], data[i][2], data[i][0][0], config.miniLabels, true, i, i == selected, data[i][3], data[i][4]);
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
    selectedData.x1 = data[selected][1];
    selectedData.y1 = data[selected][2];
    selectedData.x2 = data[selected][3];
    selectedData.y2 = data[selected][4];

    // selectDraw(selected);
    redraw(selected);

    clearCanvas();
    displayInfo(selected);

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

//Width of window
function width() {
  return $(window).width();
}

//Height of window
function height() {
  return $(window).height();
}
