// ==UserScript==
// @name        threesbot
// @namespace   http://threesjs.com/
// @description threesbot
// @include     http://threesjs.com/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js
// @resource    jQueryUICSS http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css
// @version     1
// @grant       none
// ==/UserScript==


//var newCSS = GM_getResourceText ("jQueryUICSS");
//GM_addStyle (newCSS);
//this.$ = this.jQuery = jQuery.noConflict(true);
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
    case -1: case 0: return 0;
    case 1: case 2: return -100;
    default: return tile * tile;
    }
  };
  
  var scoreBoard = function(grid) {
    var score = 0;
    for (var row = grid.length; --row >= 0;) {
      for (var col = grid[row].length; --col >= 0;) {
        score += scoreTile(grid[row][col]);
      }
    }
    return score;
  };
  
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
      avg += evaluateMove(depth, count, grid, -1)[1];
      grid[free[i]][0] = 0;
    }
    
    return avg / free.length;
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
      if (count[0] === prev) break;
    }
    
    console.log(searchDepth);
    
    return bestDir;
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

  // whether to run choppily/quickly or smoothly
  var choppy = false;

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

  that.redrawBoard = function() {
    // directly render; who needs animations
    // looks horrible though :(
    $(".board>.tile").remove();
    document.THREE.display.render_board();
  };

  that.move = function() {
    moveCounter++;

    var gameState = readGameState();
    var nextMove = moveEvaluator.bestMove(gameState.board, gameState.nextTile);
    var canMove = moveEvaluator.canApplyMove(gameState.board, nextMove);
    //console.log(nextMove + " : canApplyMove = " + canMove);
    //console.log(stringifyBoard(gameState.board));

    if(!canMove) {
      // in order to check we can't move in any direction
      var canMoveDirs = 4;
      console.log(stringifyBoard(gameState.board));
      for(var i=0; i<4; i++) {
        var canMoveThisDir = moveEvaluator.canApplyMove(gameState.board, moveEvaluator.dirs[i]);
        if(!canMoveThisDir) {
          canMoveDirs--;
        }
        console.log(moveEvaluator.dirs[i] + " : " + canMoveThisDir);
      }

      // if no moves, stop (should be game over)
      if(canMoveDirs === 0) {
        that.stop();
      }
    }

    inputMove(nextMove);

    if(choppy) {
      that.redrawBoard();
    }

    return nextMove;
  };

  that.play = function() {
    $("#playButton").attr("value", "Stop").click(controller.stop);
    if(playInterval === null) {
      if(choppy) { 
        console.log("playing choppy");
        playInterval = setInterval(that.move, moveDelay);
      } else {
        playInterval = setInterval(function() {
          console.log("playing smooth");
          if(!$(".board>.tile").is(":animated")) {
            that.move();
          }
        }, moveDelay);
      }
    }
  };

  that.stop = function() {
    moveCounter = 0;
    that.redrawBoard();

    $("#playButton").attr("value", "Play").click(controller.play);
    if(playInterval !== null) {
      clearInterval(playInterval);
      playInterval = null;
    }
  };

  that.setChoppy = function(newChoppy) {
    that.stop();
    choppy = newChoppy;
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
