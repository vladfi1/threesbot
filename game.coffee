class GameState
  isRandom: false
  agent: null
  terminal: true
  nextStates: -> []

canPushArrayIndex = (array, i) ->
  switch array[i]
    when -1 then false
    when  0 then array[i-1] != 0
    when  1 then array[i-1] == 2
    when  2 then array[i-1] == 1
    else         array[i-1] == array[i]

# tries to shift the array forwards
# returns true if successful
pushArray = (array) ->
  index = array.length;
  
  while --index > 0
    if canPushArrayIndex(array, index)
      array[index] += array[index-1]
      
      while --index > 0
        array[index] = array[index-1]
      array[0] = 0
      
      return true
  
  return false

dirs = ["up", "down", "left", "right"];

dirTransposes =
  up:   true
  down: true

dirReverses = 
  up:   true
  left: true

# does not mutate grid
transform = (grid, dir) ->
  transformed =
    if dirTransposes[dir]
      _.zip(grid...)
    else
      row.slice() for row in grid
  
  if dirReverses[dir]
    row.reverse() for row in transformed
  
  return transformed

move = (grid, dir) ->
  transformed = transform(grid, dir)
  free = (i for row, i in transformed when pushArray(row))
  
  return [transformed, free]

class ThreesState extends GameState
  constructor: (@grid) ->
  
  gridSize: ->
    sum(row.length for row in @grid)
  
  numEmpty: ->
    sum(count(0, row) for row in @grid)
  
  evaluate: ->
    [@numEmpty() / @gridSize()]

class ThreesState0 extends ThreesState
  constructor: (@grid, @next) ->
    nextStates = ([dir, @move(dir)] for dir in dirs)
    nextStates = (s for s in nextStates when s[1] isnt null)
    @nextStates = () -> nextStates
    @terminal = nextStates.length == 0
  
  agent: 0
  isRandom: false
  
  move: (dir) ->
    [transformed, free] = move(@grid, dir)
    if free.length == 0
      return null
    return new ThreesState1(transformed, free, @next)
    

class ThreesState1 extends ThreesState
  constructor: (@grid, @free, @next) ->
  
  isRandom: true
  terminal: false
  
  spawn: (index) ->
    new ThreesState2(@grid, index, @next)
  
  nextStates: ->
    weight = 1.0 / @free.length
    ([weight, @spawn(index)] for index in @free)
  
class ThreesState2 extends ThreesState
  constructor: (@grid, @index, @next) ->

  isRandom: true
  terminal: false
  
  spawn: (val) ->
    grid = @grid[..]
    row = grid[@index][..]
    row[0] = @next
    grid[@index] = row
    new ThreesState0(grid, val)
  
  nextStates: ->
    vals = [1, 2, 3]
    weight = 1 / vals.length
    ([weight, @spawn(val)] for val in vals)

heuristic = (state) ->
  rollOutEval(5, state)
strategy = new Strategy(heuristic, uct)

bestMove = (grid, next) ->
  initial = new ThreesState0(grid, next)
  node = strategy.initNode(initial)
  think = () -> strategy.explore(node)
  doFor(500, think)
  return bestAction(node)

# export bestMove
window.threesbot = {}
window.threesbot.bestMove = bestMove
