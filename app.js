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
    if (array[i] === 0) {
      if (array[i-1] !== 0) return true;
    } else if (array[i] === 1) {
      if (array[i-1] === 2) return true;
    } else if (array[i] === 2) {
      if (array[i-1] === 1) return true;
    } else {
      if (array[i-1] === array[i]) return true;
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
    
    if (index === 0) return false;
    
    while (--index > 0) {
      array[index] = array[index-1];
    }
    array[0] = 0;
    
    return true;
  };

  var dirs = ["up", "down", "left", "right"];
  that.dirs = dirs;
  var dirTransposes = {"up": true, "down": true};
  var dirReverses = {"up": true, "left":true};

  function zip(arrays) {
    return arrays[0].map(function(blank,i) {
      return arrays.map(function(array) { return array[i]; });
    });
  }

  var disassemble = function(grid, direction) {
    var disassembled = $.extend(true, [], grid);
    
    if (direction in dirTransposes) {
      disassembled = zip(disassembled);
    }
    
    if (direction in dirReverses) {
      disassembled = disassembled.map(function(arr) { return arr.reverse() });
    }
    
    return disassembled;
  };

  var assemble = function(grid, direction) {
    var assembled = $.extend(true, [], grid);
    
    if (direction in dirReverses) {
      assembled = assembled.map(function(arr) { return arr.reverse() });
    }
    
    if (direction in dirTransposes) {
      assembled = zip(assembled);
    }
    
    return assembled;
  };

  that.canApplyMove = function(grid, direction) {
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
        if (grid[row][col] === 0) ++empty;
      }
    }
    return empty;
  };

  // averages over where the next tile goes
  var evaluatePartial = function(depth, partialGrid, next) {
    var grid = partialGrid[0];
    var free = partialGrid[1];
    
    if (free.length === 0) return -10;
    
    var avg = 0;
    
    for (var i = free.length; --i >= 0;) {
      grid[free[i]][0] = next;
      avg += evaluate(depth, grid);
      grid[free[i]][0] = 0;
    }
    
    avg /= free.length;
    return avg;
  };

  // gets the best move given the next tile
  that.evaluateMove = function(depth, grid, next) {
    var partialGrids = partialApplyMoves(grid);

    // console.log('evaluateMove: depth = ' + depth);
    
    var scores = partialGrids.map(function(partialGrid) {
      return 1 + evaluatePartial(depth, partialGrid, next);
    });
    
    var maxIndex = argmax(scores);
    
    return [dirs[maxIndex], scores[maxIndex]];
  };

  var tiles = [1, 2, 3];

  // averages over possible next tiles
  var evaluate = function(depth, grid) {
    if (depth === 0) return heuristic(grid);
    
    var scores = tiles.map(function(tile) {
      return that.evaluateMove(depth - 1, grid, tile)[1];
    });
    
    var avg = 0;
    for (var i = scores.length; --i >= 0;) {
      avg += scores[i];
    }
    avg /= scores.length;
    return avg;
  };

  return that;
};
var stringifyBoard = function(board) {
  var b = "[ ";
  for(var i=0; i<board.length; i++) {
    var row = "[ ";
    for(var j=0; j<board[i].length; j++) {
      row += (board[i][j] + ", ");
    }
    row += " ],\n";
    b += row;
  }
  return b;
};

var Controller = function() {
  var that = {};
  var moveEvaluator = MoveEvaluator();
  var playInterval = null; // for setInterval purposes

  // move counter
  var moveCounter = 0;

  // move delay, in ms
  var moveDelay = 200;

  // search depth
  var searchDepth = 2;

  // whether to cheat and use the list of next tiles
  // not yet implemented
  that.useNextTileList = false;

  var readGameState = function() {
    return { board: Session.get("tiles"),
        nextTile: Session.get("next_tile"),
        nextTileList: Session.get("current_deck") };
  };

  var keyCodes = {left: 37, up: 38, right: 39, down: 40};
  var inputMove = function(move) {
    var evt = jQuery.Event("keydown");
    evt.keyCode = evt.which = keyCodes[move];
    $(window).trigger(evt);
    return move;
  };

  that.move = function() {
    moveCounter++;

    //if(moveCounter % 10 === 0) {
        $(".board>.tile").remove();
        document.THREE.display.render_board();
    //}


    var gameState = readGameState();
    var nextMove = moveEvaluator.evaluateMove(searchDepth, gameState.board, gameState.nextTile);
    var canMove = moveEvaluator.canApplyMove(gameState.board, nextMove[0]);
    console.log(nextMove + " : canApplyMove = " + canMove);
    var canMoveDirs = 4;
    if(canMove === false) {
      console.log(stringifyBoard(gameState.board));
      for(var i=0; i<4; i++) {
        var canMoveThisDir = moveEvaluator.canApplyMove(gameState.board, moveEvaluator.dirs[i]);
        if(canMoveThisDir === false) {
          canMoveDirs--;
        }
        console.log(moveEvaluator.dirs[i] + " : " + canMoveThisDir);
      }
      if(canMoveDirs === 0) {
        that.stop();
      }
    }
    return inputMove(nextMove[0]);
  };

  that.play = function() {
    $("#playButton").attr("value", "Stop").click(controller.stop);
    if(playInterval === null) {
      playInterval = setInterval(that.move, moveDelay);
    }
  };

  that.stop = function() {
    $("#playButton").attr("value", "Play").click(controller.play);
    if(playInterval !== null) {
      clearInterval(playInterval);
      playInterval = null;
    }
  };

  return that;
};

var drawUI = function() {
  controller = Controller();
  var $playButton = $("<input type='button' id='playButton' value='Play'/>");
  $playButton.click(controller.play);

  $("#new-game").after($playButton);
};

drawUI();
