var Temperature = require('../temperature');
var zetta = require('zetta');
var HttpsProxyAgent = require('https-proxy-agent');
var agent = new HttpsProxyAgent('http://proxy:8080');

zetta({
        agent: agent
    })
    .use(Temperature)
    .link('https://hello-zetta.herokuapp.com/')
    .listen(1337);
