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
    case null: return false;
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
      disassembled = disassembled.map(function(arr) { return arr.reverse(); });
    }
    
    return disassembled;
  };

  var assemble = function(grid, direction) {
    var assembled = $.extend(true, [], grid);
    
    if (direction in dirReverses) {
      assembled = assembled.map(function(arr) { return arr.reverse(); });
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
    if (tile === null || tile === 1 || tile === 2) return 0;
    var score = 1;
    while (tile > 3) {
      tile /= 2;
      score *= 3;
    }
    return score;
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
  
  // averages over where the next tile goes
  var evaluatePartial = function(depth, partialGrid, next) {
    var grid = partialGrid[0];
    var free = partialGrid[1];
    
    if (free.length === 0) return -10;
    
    var avg = 0;
    
    for (var i = free.length; --i >= 0;) {
      grid[free[i]][0] = next;
      avg += evaluate(depth, grid, true);
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

  // averages over possible next tiles, unless fast = true
  var evaluate = function(depth, grid, fast) {
    if (depth === 0) return scoreBoard(grid);
    
    var next = fast ? [null] : tiles;
    
    var scores = next.map(function(tile) {
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

  // whether to run choppily/quickly or smoothly
  var choppy = false;

  // search depth
  var searchDepth = 3;

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
    var nextMove = moveEvaluator.evaluateMove(searchDepth, gameState.board, gameState.nextTile)[0];
    var canMove = moveEvaluator.canApplyMove(gameState.board, nextMove);
    // console.log(nextMove + " : canApplyMove = " + canMove);

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
