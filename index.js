// Halt script execution for given number of microseconds.
// Inspired by Arduino's built-in delay().
//
// Lite version of [ErikDubbelboer's sleep](github.com/ErikDubbelboer/node-sleep)
// Copyright (c) 2015 Erik Dubbelboer
// License: MIT

// @param {number} ms - miliseconds
module.exports = function delay(ms){
  var then = new Date().getTime() + (ms)
  while (new Date().getTime() <= then){ /* jshint noempty:false */ }
}
