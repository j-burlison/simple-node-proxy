var express = require('express');
var app = express();

var proxy = require('http-proxy-middleware');

app.use('/client', proxy({target: 'http://node-service-josh-test.apps.employers.rht-labs.com/api', changeOrigin: true}));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';


app.use(express.static(__dirname));

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
