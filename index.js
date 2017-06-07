var R = require('ramda');
var M = require('most');
var assert = require('assert');
var grid = require('./grid');
// Stream { name: String, ctrl: Bool, shift: Bool }
var keypressS = require('./keypress');

// Stream String
var dirS = keypressS.map(R.prop('name'))
                    .filter(R.contains(R.__, ['up', 'down', 'left', 'right']));


var step = 1;
dirS.forEach(function(dir) {
  console.log('step', step++, dir);
});

var level = parseInt(process.argv[2], 10);
assert(level > 0, 'node index.js 3');
// Stream Grid
var gridS = dirS.scan(R.flip(grid.move), grid.make(level, level));
gridS.forEach(grid.display);

console.log('level:', level);
console.log('use keyboard to start: up, down, left, right');
