var zetta = require('zetta');
var Starter = require('../index');
var app = require('./apps/starter');

zetta()
  .use(Starter)
  .use(app)
  .listen(1337);
