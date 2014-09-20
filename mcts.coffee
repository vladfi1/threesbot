class Value
  constructor: (@wins, @visits = 1) ->
  
  winRatio: (agent) ->
    @wins[agent] / @visits

addValues = (values...) ->
  new Value(zipWith(sum, (v.wins for v in values)), sum(v.visits for v in values))

class Strategy
  constructor: (@heuristic, @pick) ->
  
  initNode: (state) ->
    state:    state
    value:    @heuristic(state)
    children: null

  initChildren: (node) ->
    nextStates = node.state.nextStates()
    if node.state.agent = NATURE
      node.weights, states = _.zip(nextStates)
    else
      node.actions, states = _.zip(nextStates)
    node.children = _.map(@initNode, states)
  
  explore: (node) ->
    state = node.state
    
    if state.terminal
      value = @heuristic(state)
    else if node.children is null
      @initChildren(node)
      value = addValues(child.value for child in node.children)
    else
      index = if state.agent == NATURE then sample(node.weights) else @pick(node)
      value = explore(node.children[index])
    
    node.value = addValues(node.value, value)
    return value

rollOutEval = (state) ->
  if state.terminal
    return new Value(state.evaluate())
  
  weights, states = _zip(state.nextStates())
  if state.agent == NATURE
    return rollOutEval(states[sample(weights)])
  else
    return rollOutEval(_.sample(states))

uct = (node) ->
  
  score = (index) ->
    value = node.children[index].value
    Math.sqrt(2 * Math.log(value.visits) / node.value.visits) + value.winRatio(node.state.agent)
    
  _.max(_.range(_.size(values)), score)





