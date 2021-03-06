class Value
  constructor: (@wins, @visits = 1) ->
  
  winRatio: (agent) ->
    @wins[agent] / @visits

addValues = (values...) ->
  new Value(zipWith(sum, (v1.wins for v1 in values)...), sum(v2.visits for v2 in values))

class Strategy
  constructor: (@heuristic, @pick) ->
  
  initNode: (state) ->
    return {
      state:    state
      value:    @heuristic(state)
      children: null
    }
  
  initChildren: (node) ->
    nextStates = node.state.nextStates()
    if node.state.isRandom
      [node.weights, states] = _.zip(nextStates...)
    else
      [node.actions, states] = _.zip(nextStates...)
    node.children = (@initNode(state) for state in states)
  
  explore: (node) ->
    state = node.state
    
    if state.terminal
      value = @heuristic(state)
    else if node.children is null
      @initChildren(node)
      values = (child.value for child in node.children)
      value = addValues((child.value for child in node.children)...)
    else
      if state.isRandom
        index = sample(node.weights)
      else
        index = @pick(node)
      value = @explore(node.children[index])
    
    node.value = addValues(node.value, value)
    return value

rollOutEval = (depth, state) ->
  #console.log("Depth: " + depth)
  
  if state.terminal or depth == 0
    return new Value(state.evaluate())
  
  [weights, states] = _.zip(state.nextStates()...)
  if state.isRandom
    return rollOutEval(depth-1, states[sample(weights)])
  else
    return rollOutEval(depth-1, _.sample(states))

uct = (node) ->
  values = (child.value for child in node.children)
  
  score = (index) ->
    value = node.children[index].value
    Math.sqrt(2 * Math.log(value.visits) / node.value.visits) + value.winRatio(node.state.agent)
    
  return _.max(_.range(_.size(values)), score)

bestAction = (node) ->
  agent = node.state.agent
  values = (child.value for child in node.children)
  bestIndex = _.max(_.range(_.size(values)), (index) -> values[index].winRatio(agent))
  return node.actions[bestIndex]

