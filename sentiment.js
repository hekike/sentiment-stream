'use strict';

var
  sentiment = require('sentiment'),
  through = require('through'),

  th;

th = through(function write(data) {

    var
      _this = this,
      text = data.toString();

    sentiment(text, function (err, result) {
      var
        out;

      if (err) {
        return console.error(err);
      }

      out = JSON.stringify(
        {
          score: result.score,
          text: text
        }
      );

      _this.queue(out + '\n');
    });
  },
  function end() {
    this.queue(null);
  });


module.exports = th;
