/* jshint camelcase: false */

'use strict';

var
  nconf = require('nconf'),
  Twitter = require('./lib/twitter'),
  sentimentStream = require('./lib/sentiment'),

  twitter;

// Config
nconf.file('./config.json');


twitter = new Twitter({
  consumerKey: nconf.get('twitter:consumerKey'),
  consumerSecret: nconf.get('twitter:consumerSecret'),
  accessTokenKey: nconf.get('twitter:accessTokenKey'),
  accessTokenSecret: nconf.get('twitter:accessTokenSecret')
}, 'statuses/filter', {
  locations: '-122.75,36.8,-121.75,37.8,-74,40,-73,41'
});

// Pipe it
twitter
  .pipe(sentimentStream)
  .pipe(process.stdout);
