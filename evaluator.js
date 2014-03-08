var MoveEvaluator = function() {
  var that = {};

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
    switch (array[i]) {
    case -1: return false;
    case 0: return array[i-1] !== 0;
    case 1: return array[i-1] === 2;
    case 2: return array[i-1] === 1;
    default: return array[i-1] === array[i];
    }
  };

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
    
    if (index === 0) return false;
    
    while (--index > 0) {
      array[index] = array[index-1];
    }
    array[0] = 0;
    
    return true;
  };

  var dirs = ["up", "down", "left", "right"];
  that.dirs = dirs;

  var gridSize = 4;
  var dirTransposes = {"up": true, "down": true};
  var dirReverses = {"up": true, "left":true};
  
  var transform = function(grid, direction) {
    var transformed = [];
    
    if (dirTransposes[direction]) {
      for (var i = 0; i < gridSize; ++i) {
        var row = [];
        for (var j = 0; j < gridSize; ++j) {
          row.push(grid[j][i]);
        }
        transformed.push(row);
      }
    } else {
      for (var i = gridSize; --i >= 0;) {
        transformed.push(grid[i].slice());
      }
    }
    
    if (dirReverses[direction]) {
      for (var i = gridSize; --i >= 0;) {
        transformed[i].reverse();
      }
    }
    
    return transformed;
  };

  that.canApplyMove = function(grid, direction) {
    var transformed = transform(grid, direction);

    for (var i = transformed.length; --i >= 0;) {
      if (canPushArray(transformed[i])) return true;
    }
    
    return false;
  };

  var partialApplyMove = function(grid, direction) {
    var transformed = transform(grid, direction);
    var free = [];
    
    for (var i = transformed.length; --i >= 0;) {
      if (pushArray(transformed[i])) {
        free.push(i);
      }
    }
    
    return [transformed, free];
  };

  var partialApplyMoves = function(grid) {
    return dirs.map(function(dir) { return partialApplyMove(grid, dir); });
  };

  var emptySquares = function(grid) {
    var empty = 0;
    for (var row = grid.length; --row >= 0;) {
      for (var col = grid[row].length; --col >= 0;) {
        if (grid[row][col] === 0) ++empty;
      }
    }
    return empty;
  };
  
  var scoreTile = function(tile) {
    switch (tile) {
    // case -1: case 0: return 0;
    case 1: case 2: return -1000;
    default: return tile * tile;
    }
  };
  
  var scoreBoard = function(grid) {
    var score = 0;
    for (var row = grid.length; --row >= 0;) {
      for (var col = grid[row].length; --col >= 0;) {
        score -= scoreTile(grid[row][col]);
      }
    }
    return score;
  };
  
  // possible next tiles
  var tiles = [-1, 1, 2];
  
  // takes the avg over where the next tile goes
  var evaluatePartial = function(depth, count, partialGrid, next) {
    var grid = partialGrid[0];
    var free = partialGrid[1];
    
    if (free.length === 0) return -100000;
    
    ++count[0];

    if (depth === 0) return scoreBoard(grid);
    --depth;
    
    var avg = 0;
    
    for (var i = free.length; --i >= 0;) {
      grid[free[i]][0] = next;
      for (var j = tiles.length; --j >= 0;) {
        avg += evaluateMove(depth, count, grid, tiles[j])[1];
      }
      grid[free[i]][0] = 0;
    }
    
    return avg / (free.length * tiles.length);
  };

  // gets the best move given the next tile
  var evaluateMove = function(depth, count, grid, next) {
    ++count[0];
    var partialGrids = partialApplyMoves(grid);

    // console.log('evaluateMove: depth = ' + depth);
    
    var scores = partialGrids.map(function(partialGrid) {
      return 1 + evaluatePartial(depth, count, partialGrid, next);
    });
    
    var maxIndex = argmax(scores);
    
    // console.log(scores.toString());
    
    return [dirs[maxIndex], scores[maxIndex]];
  };
  
  that.bestMove = function(grid, next) {
    var searchDepth = 0;
    var count = [0];
    var bestDir;
    while (count[0] < 10000) {
      ++searchDepth;
      var prev = count[0];
      count[0] = 0;
      bestDir = evaluateMove(searchDepth, count, grid, next)[0];
      if (count[0] === prev) {
        console.log("Dead end :(");
        break;
      }
    }
    
    console.log(searchDepth);
    
    return bestDir;
  };
  
  return that;
};
