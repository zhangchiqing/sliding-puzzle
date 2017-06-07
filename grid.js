var R = require('ramda');
var U = require('underscore');

// Number -> Number -> Grid
exports.make = function(row, col) {
  return R.splitEvery(col, U.shuffle(R.concat(R.range(1, row * col), [-1])));
};

// Direction -> Grid -> Grid
exports.move = R.curry(function(dir, grid) {
  // Cell
  var empty = findEmpty(grid);
  // Cell
  var next = findNext(dir, empty, grid);
  return swap(empty, next, grid);
});

// Grid -> (Number, Number)
exports.rowcol = function(grid) {
  var row = grid.length;
  var col = grid[0].length;
  return [row, col];
};

// Grid -> Number
exports.totalCell = function(grid) {
  var rowcol = exports.rowcol(grid);
  return rowcol[0] * rowcol[1] - 1;
};

var Cell = {
  make: R.pair,
  selectRow: R.nth(0),
  selectCol: R.nth(1),
};

// Grid -> Cell
var findEmpty = function(grid) {
  var index = R.findIndex(R.equals(-1), R.unnest(grid));
  var rowcol = exports.rowcol(grid);
  return Cell.make(Math.floor(index / rowcol[1]),
    Math.floor(index % rowcol[0]));
};

// Direction -> Cell -> Grid -> Cell
var findNext = function(dir, cell, grid) {
  var rowcol = exports.rowcol(grid);
  var gr = rowcol[0] - 1;
  var gc = rowcol[1] - 1;
  var r = Cell.selectRow(cell);
  var c = Cell.selectCol(cell);
  if (dir === 'down') {
    return Cell.make(Math.max(0, r - 1), c);
  } else if (dir === 'up') {
    return Cell.make(Math.min(gr, r + 1), c);
  } else if (dir === 'right') {
    return Cell.make(r, Math.max(0, c - 1));
  } else if (dir === 'left') {
    return Cell.make(r, Math.min(gc, c + 1));
  }
};

// Cell -> Cell -> Grid -> Grid
var swap = function(cell1, cell2, grid) {
  var tmp = read(cell1, grid);
  return set(cell2, tmp, set(cell1, read(cell2, grid), grid));
};

// Cell -> Grid -> Number
var read = function(cell, grid) {
  return grid[Cell.selectRow(cell)][Cell.selectCol(cell)];
};

// Cell -> Number? -> Grid -> Grid
var set = function(cell, value, grid) {
  grid[Cell.selectRow(cell)][Cell.selectCol(cell)] = value;
  return grid;
};

// Number -> Cell -> String
var displayCell = R.curry(function(max, cell) {
  var cellS = R.toString(cell);
  return R.concat(R.repeat(' ', max - cellS.length).join(''), cellS);
});

// Grid -> void
exports.display = function(grid) {
  var total = R.toString(exports.totalCell(grid)).length;
  var max = R.max(total, 2);
  R.map(R.pipe(R.map(displayCell(max)), R.join('  '), console.log), grid);
};
