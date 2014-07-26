'use strict';

angular.module('dtmsgApp')
  .controller('UserCtrl', function ($scope, $log, Cryptography, Initialization, Communication, Identity) {
    $scope.accordion = {
      open: true
    };

    $scope.user = Identity.currentUser;

    $scope.signupForm = {
      password: ''
    };

    $scope.createUser = function() {
      Initialization.initializeNewUser($scope.signupForm.password).then(function() {
        $scope.signupForm.password = '';
      });
    };

    $scope.updateUser = function() {
      Identity.updateUser($scope.user);
    };

    $scope.updatePassword = null;

    $scope.deleteUser = function() {
      Identity.deleteUser();
    };
  });