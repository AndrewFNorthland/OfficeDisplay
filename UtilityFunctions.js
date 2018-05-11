function instantiate() {
  displayGraph(selectedData.x, selectedData.y, "Testing", ["X-Axis", "Y-Axis"], false);
  for (var i = 0; i < data.length && i < config.maxMinis; i++) {
    displayGraph(data[i][0], data[i][1], "Test" + i, ["X-Axis", "Y-Axis"], false, i);
  }

  if (data.length > 5)
    reduceMiniSize();
  reduceMainSize();
  createCanvasOverlay();
}

function redraw() {
  displayGraph(selectedData.x, selectedData.y, "Hello", ["Test1", "Test2"], true);
  for (var i = 0; i < data.length && i < config.maxMinis; i++) {
    displayGraph(data[i][0], data[i][1], "Test" + i, ["X-Axis", "Y-Axis"], false, i);
  }
}

function startSelection(time) {
  if (!time)
    time = config.defaultSelectionTimer;

  selectionInterval = setInterval(function() {
    selectedData.x = data[selected][0];
    selectedData.y = data[selected][1];
    selectDraw(selected%config.maxMinis);
    redraw();
    selected++;
    selected = selected%data.length;
  }, time);
}

function stopSelection() {
  clearInterval(selectionInterval);
  clearCanvas();
}
