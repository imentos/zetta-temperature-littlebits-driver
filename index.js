var Scout = require('zetta-scout');
var util = require('util');
var Temperature = require('./temperature');

var TemperatureScout = module.exports = function() {
  Scout.call(this);
};
util.inherits(TemperatureScout, Scout);

TemperatureScout.prototype.init = function(next) {

  var self = this;

  var query = this.server.where({type: 'temperature'});
  var options = {default: 'DEFAULT'};

  this.server.find(query, function(err, results) {
    if (results[0]) {
      self.provision(results[0], Temperature, options);
    } else {
      self.discover(Temperature, options);
    }
  });

  next();

};
