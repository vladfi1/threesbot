function myFunction() {
  alert("HellO");
}

var canPushArrayIndex = function(array, i) {
  if (array[i] == null) {
    if (array[i-1] != null) return true;
  } else if (array[i] == 1) {
    if (array[i-1] == 2) return true;
  } else if (array[i] == 2) {
    if (array[i-1] == 1) return true;
  } else {
    if (array[i-1] == array[i]) return true;
  }
  return false;
}

var canPushArray = function(array) {
  for (var i = array.length; --i > 0;) {
    if (canPushArrayIndex(array, i)) return true;
  }
  return false;
};

// tries to shift the array forwards
// returns true if successful
var pushArray = function(array) {
  var index = array.length;
  
  while(--index > 0) {
    if (canPushArrayIndex(array, index)) {
      array[index] += array[index-1];
      break;
    }
  }
  
  if (index == 0) return false;
  
  while (--index > 0) {
    array[index] = array[index-1];
  }
  array[0] = null;
  
  return true;
};

var dirTransposes = {"up": true, "down": true};
var dirReverses = {"up": true, "left":true};

function zip(arrays) {
  return arrays[0].map(function(_,i) {
    return arrays.map(function(array) { return array[i]; });
  });
}

var disassemble = function(grid, direction) {
  var dissasembled;
  
  if (direction in dirTransposes) {
    disassembled = zip(grid);
  }
  
  if (direction in dirReverses) {
    disassembled = disassembled.map(reverse);
  }
  
  return disassembled;
};

var assemble = function(grid, direction) {
  var assembled;
  
  if (direction in dirReverses) {
    assembled = assembled.map(reverse);
  }
  
  if (direction in dirTransposes) {
    assembled = zip(grid);
  }
  
  return assembled;
};

var canApplyMove = function(grid, direction) {
  var disassembled = disassemble(grid, direction);
  
  for (var i = disassembled.length; --i >= 0;) {
    if (canPushArray(disassembled[i]) return true;
  }
  
  return false;
};

var applyMove = function(grid, direction) {
  var disassembled = disassemble(grid, direction);
  
  for (var i = disassembled.length; --i >= 0;) {
    if (!pushArray(disassembled[i]) return false;
  }
  
  return assemble(disassembled, direction);
};

var BoardState = function(grid, next) {
  this.grid = grid;
  this.next = next;
};

