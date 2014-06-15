'use strict';

/**
 * @ngdoc function
 * @name rtmsgApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the rtmsgApp
 */
angular.module('rtmsgApp')
  .controller('UserCtrl', function ($scope, $log, Communication) {
    $scope.createUser = function() {
      return Communication.initialize().then(function (session) {
        $log.info(session);
        $scope.userId = session.hashname;

        return session;
      }, function (error) {
        return $log.error('failed to create new user. msg: ' + error);
      });
    };
  });
