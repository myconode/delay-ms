/* jshint mocha:true */

'use strict'

const expect = require('chai').expect
const delay  = require('../index.js')

describe('delay', function(){
  let maxDelay = 20000
  this.timeout( maxDelay )

  it('should have a +/- 3 millisecond tolerance', function(){
    let firstDelay = execTime(delay, [1000])
    expect( firstDelay ).to.be.within(997, 1003)
  })
})

// Executes a function with given paramenters
// and measures execution time
//
// @param { function } func - function reference
// @param { array } argv - arguments as array
function execTime(func, argv){
  let start = new Date().getTime()
  func.apply(undefined, argv)
  let end = new Date().getTime()
  return end - start
}
