'use strict';

var
  expect = require('chai').expect,
  stream = require('stream'),
  Readable = stream.Readable,
  inStream = new Readable(),

  sentiment = require('../lib/sentiment');


describe('sentiment module', function () {
  var text = 'Amazing cat';

  beforeEach(function () {
    inStream._read = function () {
      inStream.push(text);
      inStream.push(null);  // end
    };

    inStream.pipe(sentiment);
  });

  it('should generate a stream with score 4', function (done) {
    var
      text = 'Amazing cat';

    sentiment.on('data', function (data) {
      data = JSON.parse(data);

      expect(data.text).to.be.equal(text);
      expect(data.score).to.be.equal(4);

      done();
    });
  });
});