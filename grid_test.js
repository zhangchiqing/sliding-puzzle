var rt = require('pkg-dir').sync(__dirname) + '/';
var assert = require('assert');
var mod = require(__filename.replace(/_test.js$/g, '.js'));

var should_pass = function() {
  var leftmost = mod.move('left', mod.move('left', mod.move('left', mod.make(3, 3))));
  assert.deepEqual(mod.move('left', leftmost), leftmost);
};

describe(__filename, function() {
  it('should_pass', should_pass);
});
