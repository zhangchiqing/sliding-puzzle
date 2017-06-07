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

var Cell = {
  make: R.pair,
  selectRow: R.nth(0),
  selectCol: R.nth(1),
};

// Grid -> Cell
var findEmpty = function(grid) {
  var index = R.findIndex(R.equals(-1), R.unnest(grid));
  return Cell.make(Math.floor(index / grid[0].length),
    Math.floor(index % grid[0].length));
};

// Direction -> Cell -> Grid -> Cell
var findNext = function(dir, cell, grid) {
  var gr = grid.length - 1;
  var gc = grid[0].length - 1;
  var r = Cell.selectRow(cell);
  var c = Cell.selectCol(cell);
  if (dir === 'up') {
    return Cell.make(Math.max(0, r - 1), c);
  } else if (dir === 'down') {
    return Cell.make(Math.min(gr, r + 1), c);
  } else if (dir === 'left') {
    return Cell.make(r, Math.max(0, c - 1));
  } else if (dir === 'right') {
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

// Grid -> String
exports.display = function(grid) {
  R.map(console.log, grid);
};
