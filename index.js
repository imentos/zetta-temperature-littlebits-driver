var Scout = require('zetta-scout');
var util = require('util');
var StarterDevice = require('./starter_device');

var StarterDeviceScout = module.exports = function() {
  Scout.call(this);
};
util.inherits(StarterDeviceScout, Scout);

StarterDeviceScout.prototype.init = function(next) {

  var self = this;

  var query = this.server.where({type: 'starter'});

  this.server.find(query, function(err, results) {
    if (results[0]) {
      self.provision(results[0], StarterDevice, {default: 'DEFAULT'});
    } else {
      self.discover(StarterDevice, {default: 'DEFAULT'});
    }
  });

  next();

};
