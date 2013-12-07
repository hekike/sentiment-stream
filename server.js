/**
 * Application root
 *
 * @module App
 **/

'use strict';

var
  express = require('express'),
  http = require('http'),
  path = require('path'),
  SocketIO = require('socket.io'),

  nconf = require('nconf'),
  Twitter = require('./lib/twitter'),
  sentimentStream = require('./lib/sentiment'),
  app = module.exports = express(),

  server,
  io,
  twitter;

nconf.file('config.json');

// Tweet stream
twitter = new Twitter({
  consumerKey: nconf.get('twitter:consumerKey'),
  consumerSecret: nconf.get('twitter:consumerSecret'),
  accessTokenKey: nconf.get('twitter:accessTokenKey'),
  accessTokenSecret: nconf.get('twitter:accessTokenSecret')
}, 'statuses/filter', {
  locations: '-122.75,36.8,-121.75,37.8,-74,40,-73,41'
});


// config express
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.static(path.join(__dirname, 'public')));


server = http.createServer(app).listen(app.get('port'), function () {
  console.log('Server is listening.', { port: app.get('port') });
});


io = SocketIO.listen(server);
io.set('log level', 0);

twitter
  .pipe(sentimentStream)
  .on('data', function (data) {
    io.sockets.emit('tweet', data);
  });