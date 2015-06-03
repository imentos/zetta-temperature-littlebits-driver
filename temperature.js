var five = require("johnny-five"),
    board, led, sensor, button, led;
board = new five.Board();

var Push = require("parse-push");
var push = new Push({
    applicationId: "1guPOUReZkTlAnP3rRloTumvR59YmfLB9VaNqMZi",
    restApiKey: "4V2LbQWJrfMqdipL3QyNSXAf8i3IJrSiMadFjeXH"
});

var pubnub = require('pubnub').init({
    publish_key: 'pub-c-c9bc3d23-4bc7-44a7-a1dc-c2d1f9445a25',
    subscribe_key: 'sub-c-22a3eac0-0971-11e5-bf9c-0619f8945a4f'
});
pubnub.subscribe({
    channel: 'dubai-led',
    callback: function(m) {
        console.log(m);
        if (led == null) {
        	return;
        }
        var result = JSON.parse(m);
        if (result.led == "on") {
        	led.on();
        } else {
        	led.off();
        }
    }
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
        .monitor('pulse');

    var self = this;
    board.on("ready", function() {
        // temperature
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

        // wake up notification
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

        // late bus notification
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

        // led light
        led = new five.Led(5);
        //led.strobe(1000);
        this.repl.inject({
            led: led
        });
    });
};
