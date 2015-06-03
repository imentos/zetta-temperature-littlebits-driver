var Temperature = require('../temperature');
var LED = require('../led');
var zetta = require('zetta');
var HttpsProxyAgent = require('https-proxy-agent');
var agent = new HttpsProxyAgent('http://proxy:8080');

zetta({
        agent: agent
    })
    .use(Temperature)
    .use(LED)
    .link('https://hello-zetta.herokuapp.com/')
    .listen(1337);
