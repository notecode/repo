// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-02-28 11:52:25
 
var math = require('mathjs');
var _extend = require('util')._extend;
var colors = require('colors');

var log = console.log;

function gLog(t) {
  log(t.green);
}
function rLog(t) {
  log(t.red);
}

module.exports = {
  extend: _extend,

  log: log,
  gLog: gLog,
  rLog: rLog,

  math: math
};
