'use strict';

var
  events = require('events'),

  nTwitter = function () {
    var
      _this = this;

    this._counter = 0;
    this._emitter = new events.EventEmitter();

    setInterval(function () {
      _this.mock.apply(_this);
    }, 5);

  };

nTwitter.prototype.mock = function () {
  this._emitter.emit('data', {text: 'Text: ' + this._counter});

  this._counter += 1;
};

nTwitter.prototype.stream = function (type, options, callback) {
  callback(this._emitter);
};

module.exports = nTwitter;