/* jshint mocha:true */

'use strict'

const expect = require('chai').expect
const delay  = require('../lib/index')

describe('delay', function(){
  let maxDelay = 20000
  this.timeout( maxDelay )

  let cases = [ 60,
                80,
                100,
                250,
                500,
                1000
              ]

  it('should have a +/- 2 millisecond tolerance', function(){
    cases.forEach(function(ms){
      let et = execTime(delay, [ ms ])

      let lowerBound = ms - 2,
          upperBound = ms + 2

      expect( et ).to.be.within( lowerBound , upperBound)
    })

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
