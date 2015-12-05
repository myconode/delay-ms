[![Build Status](https://travis-ci.org/thelostspore/delay-ms.svg?branch=master)](https://travis-ci.org/thelostspore/delay-ms)
[![npm version](https://badge.fury.io/js/delay-ms.svg)](https://badge.fury.io/js/delay-ms)

[![Dependency Status](https://david-dm.org/thelostspore/delay-ms.svg)](https://david-dm.org/thelostspore/delay-ms)
[![devDependency Status](https://david-dm.org/thelostspore/delay-ms/dev-status.svg)](https://david-dm.org/thelostspore/delay-ms#info=devDependencies)

# Delay
Halt script execution for given number of milliseconds
```node
const delay = require('delay-ms')

console.log("Hello..")
delay(2000)
console.log("..World")
```

- Made for micrco-controllers running Javascript, such as the [Tessel](https://tessel.io/)
- Inspired by Arduino's built-in [delay](https://www.arduino.cc/en/Reference/Delay)


## Development

### Tests
`mocha/chai` hooked into `gulp`

```
gulp tests
```


### Release
Create git tag & github release, publish package to npm registry

```
gulp release
```

