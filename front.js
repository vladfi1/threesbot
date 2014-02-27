// ==UserScript==
// @name        threesbot
// @namespace   http://threesjs.com
// @include     http://threesjs.com
// @version     0.1
// ==/UserScript==

var Controller = function() {
  var that;
  var playInterval = null; // for setInterval purposes

  // move delay, in ms
  var moveDelay = 100;

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

  var inputMove = function(move) {
    var keyCodes = {left: 37, up: 38, right: 39, down: 40};
    var evt = jQuery.Event("keydown");
    evt.keyCode = evt.which = keyCodes[move];
    $(window).trigger(evt);
    return move;
  };

  that.move = function() {
    var gameState = readGameState();
    return inputMove(evaluateMove(searchDepth, gameState.board, gameState.nextTile));
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
};

var drawUI = function() {
  controller = Controller();
  var $playButton = $( "<input type='button' id='playButton' value='Play'/>" );
  $playButton.click(controller.play);

  $("#new-game").after($playButton);
};

drawUI();
