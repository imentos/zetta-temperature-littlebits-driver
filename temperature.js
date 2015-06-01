var five = require("johnny-five"),
    board, led, sensor, button;
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
            freq: 500
        });
        led = new five.Led(9);
        sensor.on("data", function(err, value) {
            self.pulse = 100 * this.raw / 1023;
            console.log("sensor reading " + self.pulse);
            //led.brightness(self.pulse);
        });
    });


    button = new five.Button(0);
    button.on("press", function(value) {
        console.log("wake up");
        push.sendToChannels(["dubai"], {
            "alert": "Congratulations! low electriciy usage yesterday."
        }, function(error, data) {
            if (error) {
                console.error("Oh no it went wrong!: " + error.message);
            }
        });
    });

    var button = new five.Button({
        pin: "A0"
    });
    button.on("press", function(value) {
        console.log("late bus");
        push.sendToChannels(["dubai"], {
            "alert": "The bus late because of accident.",
            category: "BUS_LATE_CATEGORY"
        }, function(error, data) {
            if (error) {
                console.error("Oh no it went wrong!: " + error.message);
            }
        });
    });

};
