var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.use('/api/google', proxy({target: 'https://www.google.com', changeOrigin: true}));

app.use('/api/proxy', proxy({target: 'https://www.google.com', changeOrigin: true}));

app.listen(3000);
