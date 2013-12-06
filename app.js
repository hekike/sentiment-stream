/* jshint camelcase: false */

'use strict';

var
  nconf = require('nconf'),
  twitter = require('./lib/twitter'),
  sentimentStream = require('./lib/sentiment');

// Config
nconf.file('./config.json');

twitter.config({
  consumerKey: nconf.get('twitter:consumerKey'),
  consumerSecret: nconf.get('twitter:consumerSecret'),
  accessTokenKey: nconf.get('twitter:accessTokenKey'),
  accessTokenSecret: nconf.get('twitter:accessTokenSecret')
});

// Pipe it
twitter.getStream()
  .pipe(sentimentStream)
  .pipe(process.stdout);
