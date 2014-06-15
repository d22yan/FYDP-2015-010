'use strict';

/**
 * @ngdoc function
 * @name rtmsgApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the rtmsgApp
 */
angular.module('rtmsgApp')
  .controller('UserCtrl', function ($scope, Communication) {
    $scope.createUser = function() {
      return Communication.initialize().then(function (session) {
        console.dir(session);
        $scope.userId = session.hashname;

        return session;
      }, function (error) {
        return console.error('failed to create new user. msg: ' + error);
      });
    };
  });
