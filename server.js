/* jshint camelcase: false */

'use strict';

var
  sentiment = require('sentiment'),
  through = require('through'),

  tweetStream = require('./twitter').getStream(),

  tweeThrough;


tweeThrough = through(function write(data) {

    var
      _this = this,
      text = data.toString();

    sentiment(text, function (err, result) {

      if(err) {
        return console.error(err);
      }

      _this.queue(JSON.stringify({
        text: text,
        score: result.score
      }));
    });
  },
  function end () {
    this.queue(null);
  });


tweetStream.pipe(process.stdout);
tweetStream
  .pipe(tweeThrough)
  .pipe(process.stdout);
