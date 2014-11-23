var Device = require('zetta-device');
var util = require('util');

var Starter = module.exports = function(options) {
  Device.call(this);
  this._default = options['default'];
};
util.inherits(Starter, Device);

Starter.prototype.init = function(config) {
  config
  .name('Starter')
  .type('starter')
  .state('waiting')
  .when('waiting', { allow: ['do']})
  .when('doing', { allow: [] })
  .map('do', this.do, [
    { name: 'message', type: 'text'}
  ]);
};

Starter.prototype.do = function(message, cb) {
  this.state = 'doing';
  this.log(this._default + ': ' + message);
  this.state = 'waiting';
  cb();
};
