var five = require("johnny-five"),
    board, led, sensor, button;
board = new five.Board();

var Push = require("parse-push");
var push = new Push({
    applicationId: "1guPOUReZkTlAnP3rRloTumvR59YmfLB9VaNqMZi",
    restApiKey: "4V2LbQWJrfMqdipL3QyNSXAf8i3IJrSiMadFjeXH"
});

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
        .state('off')
        .monitor('pulse')
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
        // temperature
        sensor = new five.Sensor({
            pin: "A1",
            freq: 500
        });
        sensor.on("data", function(err, value) {
            self.pulse = 100 * this.raw / 1023;
            console.log("sensor reading " + self.pulse);
            //led.brightness(self.pulse);
        });

        // wake up notification
        button = new five.Button(0);
        button.on("press", function(value) {
            console.log("wake up");
            push.sendToChannels(["dubai"], {
                "alert": "Congratulations! You have earned Energy Star Award \ue131 for low Electricity usage Yesterday"
            }, function(error, data) {
                if (error) {
                    console.error("Oh no it went wrong!: " + error.message);
                }
            });
        });

        // late bus notification
        var button = new five.Button({
            pin: "A0"
        });
        button.on("press", function(value) {
            console.log("late bus");
            push.sendToChannels(["dubai"], {
                "alert": "Bus is late due to an accident on your Route",
                category: "BUS_LATE_CATEGORY"
            }, function(error, data) {
                if (error) {
                    console.error("Oh no it went wrong!: " + error.message);
                }
            });
        });

        // led light
        led = new five.Led(5);
        this.repl.inject({
            led: led
        });
    });
};

Temperature.prototype.turnOn = function(cb) {
    this.state = 'on';
    led.on();
    cb();
};

Temperature.prototype.turnOff = function(cb) {
    this.state = 'off';
    led.off();
    cb();
};
