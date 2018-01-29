var express = require('express');
var app = express();
var cors = require('cors');
var proxy = require('http-proxy-middleware');

app.use(cors());

// app.use('/client', proxy({target: 'http://0.0.0.0:8090/api', changeOrigin: false}));
// app.use('/client', proxy({target: 'http://node-service-josh-test.apps.employers.rht-labs.com/api', changeOrigin: false}));

var request = require('request');

app.use('/client', (req, res, next)=>{
  console.log('PROXY HIT');
  request('http://node-service-josh-test.apps.employers.rht-labs.com/api/client'+req.url).pipe(res);
  // request('http://0.0.0.0:8090/api/client'+req.url).pipe(res);
});

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';


app.use(express.static(__dirname));

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
