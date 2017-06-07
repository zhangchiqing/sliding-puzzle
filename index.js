var R = require('ramda');
var grid = require('./grid');
// Stream { name: String, ctrl: Bool, shift: Bool }
var keypressS = require('./keypress');

// Stream String
var dirS = keypressS.map(R.prop('name'))
                    .filter(R.contains(R.__, ['up', 'down', 'left', 'right']));

dirS.forEach(console.log);

// Stream Grid
var gridS = dirS.scan(R.flip(grid.move), grid.make(3,3));
gridS.forEach(grid.display);

console.log('use keyboard to start: up, down, left, right');
