function myFunction() {
  alert("HellO");
}

var argmax = function(array) {
  var maxIndex = 0;
  var maxValue = array[0];
  
  for (var i = array.length; --i > 0;) {
    if (array[i] > maxValue) {
      maxIndex = i;
      maxValue = array[i];
    }
  }
  
  return maxIndex;
};

var canPushArrayIndex = function(array, i) {
  if (array[i] == null) {
    if (array[i-1] != null) return true;
  } else if (array[i] == 1) {
    if (array[i-1] == 2) return true;
  } else if (array[i] == 2) {
    if (array[i-1] == 1) return true;
  } else {
    if (array[i-1] == array[i]) return true;
  }
  return false;
}

var canPushArray = function(array) {
  for (var i = array.length; --i > 0;) {
    if (canPushArrayIndex(array, i)) return true;
  }
  return false;
};

// tries to shift the array forwards
// returns true if successful
var pushArray = function(array) {
  var index = array.length;
  
  while(--index > 0) {
    if (canPushArrayIndex(array, index)) {
      array[index] += array[index-1];
      break;
    }
  }
  
  if (index == 0) return false;
  
  while (--index > 0) {
    array[index] = array[index-1];
  }
  array[0] = null;
  
  return true;
};

var dirs = ["up", "down", "left", "right"];
var dirTransposes = {"up": true, "down": true};
var dirReverses = {"up": true, "left":true};

function zip(arrays) {
  return arrays[0].map(function(_,i) {
    return arrays.map(function(array) { return array[i]; });
  });
}

var disassemble = function(grid, direction) {
  var dissasembled = grid;
  
  if (direction in dirTransposes) {
    disassembled = zip(disassembled);
  }
  
  if (direction in dirReverses) {
    disassembled = disassembled.map(reverse);
  }
  
  return disassembled;
};

var assemble = function(grid, direction) {
  var assembled = grid;
  
  if (direction in dirReverses) {
    assembled = assembled.map(reverse);
  }
  
  if (direction in dirTransposes) {
    assembled = zip(assembled);
  }
  
  return assembled;
};

var canApplyMove = function(grid, direction) {
  var disassembled = disassemble(grid, direction);
  
  for (var i = disassembled.length; --i >= 0;) {
    if (canPushArray(disassembled[i])) return true;
  }
  
  return false;
};

var partialApplyMove = function(grid, direction) {
  var disassembled = disassemble(grid, direction);
  var free = [];
  
  for (var i = disassembled.length; --i >= 0;) {
    if (pushArray(disassembled[i])) {
      free.push(i);
    }
  }
  
  return [disassembled, free];
};

var partialApplyMoves = function(grid) {
  return dirs.map(function(dir) { return partialApplyMove(grid, dir); });
};

var heuristic = function(grid) {
  var empty = 0;
  for (var row = grid.length; --row >= 0;) {
    for (var col = grid[row].length; --col >= 0;) {
      if (grid[row][col] == null) ++empty;
    }
  }
  return empty;
};

// averages over where the next tile goes
var evaluatePartial = function(depth, partialGrid, next) {
  var grid = partialGrid[0];
  var free = partialGrid[1];
  
  if (free.length == 0) return 0;
  
  var avg = 0;
  
  for (var i = free.length; --i >= 0;) {
    grid[free[i]][0] = next;
    avg += evaluate(depth, grid);
    grid[free[i]][0] = null;
  }
  
  avg /= free.length;
  return avg;
};

// gets the best move given the next tile
var evaluateMove = function(depth, grid, next) {
  var partialGrids = partialApplyMoves(grid);
  
  var scores = partialGrids.map(function(partialGrid) {
    return evaluatePartial(depth, partialGrid, next);
  });
  
  var maxIndex = argmax(scores);
  
  return [dirs[maxIndex], scores[maxIndex]];
};

var tiles = [1, 2, 3];

// averages over possible next tiles
var evaluate = function(depth, grid) {
  if (depth == 0) return heuristic(grid);
  
  var scores = tiles.map(function(tile) {
    return evaluateMove(depth - 1, grid, tile)[1];
  });
  
  var avg = 0;
  for (var i = scores.length; --i >= 0;) {
    avg += scores[i];
  }
  avg /= scores.length;
  return avg;
};

