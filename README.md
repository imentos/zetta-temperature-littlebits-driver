##Zetta temperature driver for LittleBits

###Install

```
$> git clone https://github.com/imentos/zetta-temperature-littlebits-driver.git
```

###Usage

```
var zetta = require('zetta');
var Temperature = require('zetta-temperature-littlebits-driver');

zetta()
  .use(Temperature)
  .listen(1337)
```

### Hardware

* LittleBits

