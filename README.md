[![Build Status](https://travis-ci.org/thelostspore/delay-lite.svg?branch=master)](https://travis-ci.org/thelostspore/delay-lite)
[![npm version](https://badge.fury.io/js/delay-lite.svg)](https://badge.fury.io/js/delay-lite)

# Delay
Halt script execution for given number of miliseconds
```
console.log("Hello..")
delay(2000)
console.log("..World")
```

## Notes
- Useful for Javascript micrco-controllers such as the [Tessel](https://tessel.io/).
- Inspired by Arduino's built-in [delay](https://www.arduino.cc/en/Reference/Delay)