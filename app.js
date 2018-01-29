var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.use('/', proxy({target: 'https://www.google.com', changeOrigin: true}));

app.use('/proxy', proxy({target: 'http://node-service-josh-test.apps.employers.rht-labs.com', changeOrigin: true}));

app.listen(3000);
