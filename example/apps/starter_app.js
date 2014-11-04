module.exports = function testApp(server) {
  
  var starterDeviceQuery = server.where({type: 'starter'});
  
  server.observe([starterDeviceQuery], function(starterDevice){
    setInterval(function(){
      starterDevice.call('do', './app.js is running', function() {});
    }, 5000);
  });
  
}