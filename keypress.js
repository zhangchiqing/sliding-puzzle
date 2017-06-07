var keypress = require('keypress');
var R = require('ramda');
var M = require('most');

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// Stream { name: String, ctrl: Bool, shift: Bool }
var keypressS = M.fromEvent('keypress', process.stdin).map(R.nth(1));

keypressS.forEach(function(key) {
  if (key && key.ctrl && key.name === 'c') {
    process.stdin.pause();
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();

module.exports = keypressS;
