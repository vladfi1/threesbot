// ==UserScript==
// @name        threesbot
// @namespace   http://threesjs.com
// @include     http://threesjs.com
// @version     0.1
// ==/UserScript==

var readGameState = function() {
  var BOARD_SIZE = 4;
  var state = {}

  var board = [];
  for(var i=0; i<BOARD_SIZE; i++) {
    var row = [];
    for(var j=0; j<BOARD_SIZE; j++) {
      row.push(null);  
    }
    board.push(row);
  }

  var $tiles = $(".board>.tile");
  for(var i=0; i<$tiles.length; i++) {
    var $tile = $($tiles[i]);
    var coords = $tile.attr("data-coords");
    board[coords.charAt(0)][coords.charAt(1)] = parseInt($tile.html());
  }

  state.board = board;
  var $nextTileElt = $(".next>.tile");

  if($nextTileElt.hasClass("blue")) {
    state.next = 1;
  } else if($nextTileElt.hasClass("red")) {
    state.next = 2;
  } else {
    // "3" really means "3 * 2^n"
    state.next = 3;
  }

  return state;
};

var inputMove = function(move) {
  var keyCodes = {"left": 37, "up": 38, "right": 39, "down": 40};
  var evt = jQuery.Event("keydown");
  evt.keyCode = evt.which = keyCodes[move];
  $(window).trigger(evt);
  return move;
};
