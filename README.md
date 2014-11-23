##Zetta starter driver for any platform

###Install

```
$> git clone https://github.com/zettajs/zetta-starter-driver zetta-{device}-{platform}-driver
```

###Usage

```
var zetta = require('zetta');
var Starter = require('zetta-starter-driver');

zetta()
  .use(Starter)
  .listen(1337)
```

### Hardware

* any platform

###Transitions

#####do(message)

Calls the device's log() function passing the message param.

###Design

This device driver is designed to be the starter code for other device drivers.