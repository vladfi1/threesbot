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
