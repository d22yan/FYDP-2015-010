'use strict';

/**
 * @ngdoc function
 * @name rtmsgApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the rtmsgApp
 */
angular.module('rtmsgApp')
  .controller('UserCtrl', function ($scope, $log, Communication, Identity) {
    $scope.accordion = {
      open: true
    };

    if (!Identity.currentUser) {
      Identity.updateUser({ name: 'New User' });
    }

    $scope.user = Identity.currentUser;

    $scope.$watch(function() { return Identity.currentUser; }, function() {
      $scope.user = Identity.currentUser;
    });

    $scope.createUser = function() {
      Identity.createUser($scope.user).then(null, function (error) {
        $log.error(error);
      });
    };

    $scope.updateUser = function() {
      Identity.updateUser($scope.user);
    };

    $scope.deleteUser = function() {
      Identity.deleteUser();
    };
  });
