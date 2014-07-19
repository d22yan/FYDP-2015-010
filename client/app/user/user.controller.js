'use strict';

angular.module('dtmsgApp')
  .controller('UserCtrl', function ($scope, $log, Initialization, Communication, Identity) {
    $scope.accordion = {
      open: true
    };

    $scope.user = Identity.currentUser;

    $scope.createUser = function() {
      Identity.createUser($scope.user)
        .then(Initialization.reinitialize)
        .catch($log.error);
    };

    $scope.updateUser = function() {
      Identity.updateUser($scope.user);
    };

    $scope.deleteUser = function() {
      Identity.deleteUser();
    };
  });