var Device = require('zetta-device');
var util = require('util');

var StarterDevice = module.exports = function(options) {
  Device.call(this);
  this._default = options['default'];
};
util.inherits(StarterDevice, Device);

StarterDevice.prototype.init = function(config) {
  config
  .name('Starter Device')
  .type('starter')
  .state('waiting')
  .when('waiting', { allow: ['do']})
  .when('doing', { allow: [] })
  .map('do', this.do, [
    { name: 'message', type: 'text'}
  ]);
};

StarterDevice.prototype.do = function(message, cb) {
  this.state = 'doing';
  this.log(this._default + ': ' + message);
  this.state = 'waiting';
  cb();
};
