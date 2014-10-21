var Scout = require('zetta-scout');
var util = require('util');
var StarterDevice = require('./starter_device');

var StarterDeviceScout = module.exports = function() {
  Scout.call(this);
};
util.inherits(StarterDeviceScout, Scout);

StarterDeviceScout.prototype.init = function(next) {
  var self = this;
  self.discover(StarterDevice, {default: 'DEFAULT'});
  next();
}