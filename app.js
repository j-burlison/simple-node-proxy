// Deps
var express = require('express');
var app = express();
var cors = require('cors');
var proxy = require('http-proxy-middleware');

// Env Vars can be set in OSE
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// Enable CORS. For local Development and De-coupled UI Deployment and Code Base
if (process.env.NAME === 'DEV') {
  console.log('In DEV Env');
  app.use(cors());
}

// Route all '/client' REST traffic to an OSE Service that has exposed endpoints at '/api/client'
app.use('/client', proxy({target: 'http://node-service-josh-test.apps.employers.rht-labs.com/api', changeOrigin: true}));

// Serve Static Files to '/index' (for UI)
app.use('/index', express.static(__dirname));

// Start App
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

// Expose App Routes
module.exports = app;
