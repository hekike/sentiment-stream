/* jshint camelcase: false */
'use strict';

var
  ntwitter = require('ntwitter'),
  util = require('util'),
  Readable = require('stream').Readable,

  Twitter;

Twitter = function (config, type, filter, options) {

  Readable.call(this, options);

  if(!config) {
    return;
  }

  this._type = type;
  this._filter = filter;

  this._twit = new ntwitter({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    access_token_key: config.accessTokenKey,
    access_token_secret: config.accessTokenSecret
  });

  // Error
  this.on('error', function (err) {
    console.error(err);
  });
};

util.inherits(Twitter, Readable);

Twitter.prototype._read = function () {
  var _this = this;

  // Push data
  _this._twit.stream(this._type, this._filter, function (stream) {
    stream.on('data', function (data) {
      if(data.text) {
        _this.push(data.text);
      }
    });

    // Error
    stream.on('error', function (err) {
      console.error('Twitter error', err);
    });
  });
};


Twitter.prototype.mockNTwitter = function (MockedModule) {
  this._twit = new MockedModule();
};

module.exports = Twitter;

