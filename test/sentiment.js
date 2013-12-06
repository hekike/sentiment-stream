'use strict';

var
  expect = require('chai').expect,
  stream = require('stream'),
  Readable = stream.Readable,
  inStream = new Readable(),

  sentiment = require('../lib/sentiment');

inStream._read = function () {};

describe('sentiment module', function () {

  beforeEach(function () {
    inStream.pipe(sentiment);
  });

  it('should generate a stream with score 4', function (done) {
    var
      text = 'Amazing cat';

    inStream.push(text);

    sentiment.on('data', function (data) {
      data = JSON.parse(data);

      expect(data.text).to.be.equal(text);
      expect(data.score).to.be.equal(4);

      done();
    });
  });
});