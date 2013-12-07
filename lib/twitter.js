/* jshint camelcase: false */
'use strict';

var
  ntwitter = require('ntwitter'),
  util = require('util'),
  Readable = require('stream').Readable,

  Twitter;


/**
 * Twitter stream
 *
 * @class Twitter
 * @constructor
 */
Twitter = function (config, type, filter, options) {
  var _this = this;

  Readable.call(this, options);

  config = config || {};
  type = type || 'statuses/filter';
  filter= filter || { locations: '-122.75,36.8,-121.75,37.8,-74,40,-73,41' };

  new ntwitter({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    access_token_key: config.accessTokenKey,
    access_token_secret: config.accessTokenSecret
  })
    .stream(type, filter, function (stream) {
      stream.on('data', function (data) {
        if (data.text) {
          _this.push(data.text);
        }
      });

      // Error
      stream.on('error', function (err) {
        console.error('Twitter error', err);
      });
    });

  // Error
  this.on('error', function (err) {
    console.error(err);
  });
};

util.inherits(Twitter, Readable);


/**
 * Implement _read
 *
 * @method _read
 * stream.Readable method
 */
Twitter.prototype._read = function () {

};


/**
 * Mock nTwitter npm module
 *
 * @method mockNTwitter
 * @param {class} MockedModule
 */
Twitter.mockNTwitter = function (MockedModule) {
  ntwitter = MockedModule;
};

module.exports = Twitter;

