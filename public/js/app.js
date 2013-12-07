/*globals io */

'use strict';

angular.module('sentimentApp', [])

  .factory('socket', function ($rootScope) {
    var
      socket = io.connect();

    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      }
    };
  })

  .controller('MainCtrl', function ($scope, socket) {
    $scope.tweets = [];
    $scope.score = 0;

    socket.on('tweet', function (data) {

      try {
        data = JSON.parse(data);
      } catch (err) {
        console.error(err);
      }

      if(data.score > 10) {
        data.score = 10;
      }

      if(data.score < -10) {
        data.score = -10;
      }

      $scope.tweets.push(data);

      if($scope.tweets.length > 12) {
        $scope.tweets.shift();
      }

      $scope.score = 0;
      angular.forEach($scope.tweets, function (tweet) {
        $scope.score += tweet.score;
      });

      $scope.score =  (50 * $scope.score) / (10 * $scope.tweets.length) + 50;
    });

  });