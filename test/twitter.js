'use strict';

var
  expect = require('chai').expect,
  stream = require('stream'),
  Readable = stream.Readable,

  twitter = require('../twitter');

describe('twitter module', function () {

  var stream;

  twitter.setNTwitter(require('./mock/ntwitter'));


  beforeEach(function () {
    stream = twitter.getStream();
  });


  it('should get a Readable stream', function () {
    expect(stream).to.be.an.instanceof(Readable);
  });

  it('should keep alive', function (done) {

    stream.on('data', function (buffer) {
      var
        text = buffer.toString();

      expect(text).to.be.equal('Text: 0');
      done();
    });


  });
});