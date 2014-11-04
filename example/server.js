var zetta = require('zetta');
var StarterDevice = require('../index');
var app = require('./apps/starter_app');

zetta()
  .use(StarterDevice)
  .use(app)
  .listen(1337);
