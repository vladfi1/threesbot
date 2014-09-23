sum = (xs) ->
  _.reduce(xs, ((a, b) -> a + b), 0)

zipWith = (f, lists...) ->
  _.map(_.zip(lists...), f)

sample = (weights) ->
  random = Math.random()
  
  total = 0
  for w, i in weights
    total += w
    if random <= total
      return i

count = (x, xs) ->
  _.reduce(xs, ((total, y) -> if y == x then total+1 else total), 0)

currentTime = () ->
  new Date().getTime()

doFor = (t, f) ->
  start = currentTime()
  while currentTime() - start < t
    f()
