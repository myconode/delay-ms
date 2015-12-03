[![Build Status](https://travis-ci.org/thelostspore/delay-ms.svg?branch=master)](https://travis-ci.org/thelostspore/delay-ms)
[![npm version](https://badge.fury.io/js/delay-ms.svg)](https://badge.fury.io/js/delay-ms)

# Delay
Halt script execution for given number of miliseconds
```
console.log("Hello..")
delay(2000)
console.log("..World")
```

Made for micrco-controllers running Javascript, such as the [Tessel](https://tessel.io/).

Inspired by Arduino's built-in [delay](https://www.arduino.cc/en/Reference/Delay)


## Tests
`mocha/chai` hooked into `gulp`

```
gulp tests
```
