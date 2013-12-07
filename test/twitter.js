'use strict';

var
  expect = require('chai').expect,
  Twitter = require('../lib/twitter');

Twitter.mockNTwitter(require('./mock/ntwitter'));

describe('twitter module', function () {
  var twitter = new Twitter();

  it('should get a Readable stream', function () {
    expect(twitter).to.be.an.instanceof(Twitter);
  });

  it('should keep alive', function (done) {

    twitter.on('data', function (buffer) {
      var
        text = buffer.toString();

      expect(text).to.match(/Text: [0-9]{1}$/);
      done();
    });


  });
});