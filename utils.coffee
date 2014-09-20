sum = (xs) ->
  _.reduce(xs, (a, b) -> a + b)

zipWith = (f, lists...) ->
  _.map(f, _.zip(lists))

sample = (weights) ->
  random = Math.random()
  
  total = 0
  for w, i in weights
    total += w
    if random <= total
      return i
