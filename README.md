##Zetta starter device driver for any platform

###Install

```
$> npm install zetta-starter-device-driver
```

###Usage

```
var zetta = require('zetta');
var StarterDevice = require('zetta-starter-device-driver');

zetta()
  .use(StarterDevice)
  .listen(1337)
```

### Hardware

* any platform

###Transitions

#####do(message)

Calls the device's log() function passing the message param.

###Design

This device driver is designed to be the starter code for other device drivers.