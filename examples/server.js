var zetta = require('zetta');
var StarterDevice = require('../index');
var app = require('./app');

zetta()
  .use(StarterDevice)
  .use(app)
  .listen(1337);
