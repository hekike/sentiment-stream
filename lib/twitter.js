/* jshint camelcase: false */
'use strict';

var
  ntwitter = require('ntwitter'),
  stream = require('stream'),
  Readable = stream.Readable,
  tweetStream = new Readable(),
  twit,

  // fns
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

exports.config = function (config) {

  twit = new ntwitter({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    access_token_key: config.accessTokenKey,
    access_token_secret: config.accessTokenSecret
  });

  init();
};

exports.getStream = function () {
  return tweetStream;
};


exports.setNTwitter = function (Mod) {
  twit = new Mod();

  init();
};

