var five = require("johnny-five"),
    board, sensor;
board = new five.Board();





var Device = require('zetta-device');
var util = require('util');
var Temperature = module.exports = function(options) {
    this.pulse = null;
    Device.call(this);
};
util.inherits(Temperature, Device);

Temperature.prototype.init = function(config) {
    config
        .type('temperature')
        .monitor('pulse');

    var self = this;
    board.on("ready", function() {
        sensor = new five.Sensor({
            pin: "A1",
            freq: 250
        });
        sensor.on("data", function() {
            self.pulse = this.raw;
            console.log("sensor reading " + this.raw);
        });
    });
};
