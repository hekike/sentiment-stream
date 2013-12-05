/* jshint camelcase: false */
'use strict';

var
  ntwitter = require('ntwitter'),
  stream = require('stream'),
  Readable = stream.Readable,

  twit = new ntwitter({
    consumer_key: 'JdygRSL10kWO9aftuNN3w',
    consumer_secret: '4cXcVhEaeG9oQ7PgIirNlLRWUIFJvi6zRUMXbBsAWA',
    access_token_key: '741502640-lZG4Y0aa8djEFVa4QOfXy9kne542OyHbLXxF3xGh',
    access_token_secret: 'KBms9kAoY9MPGlvt45Njv6pxO5FsZkDcWTbf4mrDccdsO'
  }),

  tweetStream = new Readable(),

  init;

tweetStream.on('error', function (err) {
  console.error(err);
});

tweetStream._read = function () {};


init = function () {

  twit.stream('statuses/filter', {
    locations: '-122.75,36.8,-121.75,37.8,-74,40,-73,41'
  }, function (stream) {
    stream.on('data', function (data) {
      tweetStream.push(data.text);
    });
  });

};

exports.getStream = function () {
  return tweetStream;
};


exports.setNTwitter = function (mod) {
  twit = new mod();

  init();
};


init();