
var Temperature = require('../temperature');
var zetta = require('zetta');
//var app = require('./apps/starter');

zetta()
  .use(Temperature)
  //.use(app)
  .listen(1337);
