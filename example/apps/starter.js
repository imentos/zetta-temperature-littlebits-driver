module.exports = function testApp(server) {
  
  // add query params in the where object like so:
  // var starterDeviceQuery = server.where({type: 'led'});
  var starterDeviceQuery = server.where({});
  
  server.observe([starterDeviceQuery], function(starterDevice){
    setInterval(function(){
      starterDevice.call('do', './example/apps/starter_app.js is running', function() {});
    }, 1000);
  });
  
}