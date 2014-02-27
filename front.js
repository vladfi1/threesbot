// ==UserScript==
// @name        threesbot
// @namespace   http://threesjs.com
// @include     http://threesjs.com
// @version     0.1
// ==/UserScript==

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
