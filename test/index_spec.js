var expect = require('chai').expect
var delay  = require('../index.js')

describe('delay', function(){
  var maxDelay = 20000
  this.timeout( maxDelay )

  it('should have a +/- 3 millisecond tolerance', function(){
    var firstDelay = execTime(delay, [1000])
    expect( firstDelay ).to.be.within(995, 1005)
  })
})

// Executes a function with given paramenters
// and measures execution time
//
// @param { function } func - function reference
// @param { array } argv - arguments as array
function execTime(func, argv){
  var start = new Date().getTime()
  /*jshint eval:true */
  func.apply(this, argv)
  var end = new Date().getTime()
  return end - start
}
