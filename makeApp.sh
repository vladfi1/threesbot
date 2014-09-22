#!/bin/sh
cat utils.coffee mcts.coffee game.coffee > lib.coffee
coffee -c lib.coffee
cat underscore-min.js lib.js evaluator.js front.js > app.js
uglifyjs app.js > app.min.js
