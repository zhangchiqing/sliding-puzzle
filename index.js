var R = require('ramda');
var grid = require('./grid');
// Stream { name: String, ctrl: Bool, shift: Bool }
var keypressS = require('./keypress');

// Stream String
var dirS = keypressS.map(R.prop('name'))
                    .filter(R.contains(R.__, ['up', 'down', 'left', 'right']));

dirS.forEach(console.log);

var level = 4;
// Stream Grid
var gridS = dirS.scan(R.flip(grid.move), grid.make(level, level));
gridS.forEach(grid.display);

console.log('level:', level);
console.log('use keyboard to start: up, down, left, right');
