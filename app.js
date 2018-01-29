var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

// var Promise = require('bluebird');
// var proxy = require('http-proxy-middleware');
// app.use('/', proxy({target: 'https://www.google.com', changeOrigin: true}));
// app.use('/', proxy({target: 'http://node-service-josh-test.apps.employers.rht-labs.com/google', changeOrigin: true}));

var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// accessed at GET http://localhost:8080/google
router.get('/google', function(req, res) {
    console.log('Routing to GOOGLE');
    request('https://www.google.com').pipe(res);
});

router.get('/proxy', function(req, res) {
    console.log('Routing to GOOGLE');
    request('http://node-service-josh-test.apps.employers.rht-labs.com/google').pipe(res);
});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
