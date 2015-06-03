var five = require("johnny-five"),
    board, led;
board = new five.Board();

var Device = require('zetta-device');
var util = require('util');
var LED = module.exports = function(options) {
    this.pulse = null;
    Device.call(this);
};
util.inherits(LED, Device);

LED.prototype.init = function(config) {
    config
        .type('led')
        .state('off')
        .name(this.led)
        .when('off', {
            allow: ['turn-on']
        })
        .when('on', {
            allow: ['turn-off']
        })
        .map('turn-on', this.turnOn)
        .map('turn-off', this.turnOff);

    var self = this;
    board.on("ready", function() {
        // led light
        led = new five.Led(5);
        this.repl.inject({
            led: led
        });
    });
}

LED.prototype.turnOn = function(cb) {
    this.state = 'on';
    led.on();
    cb();
};

LED.prototype.turnOff = function(cb) {
    this.state = 'off';
    led.off();
    cb();
};
