'use strict';

angular.module('dtmsgApp')
  .controller('UserCtrl', function ($scope, $log, Communication, Identity) {
    $scope.accordion = {
      open: true
    };

    $scope.user = Identity.currentUser;

    $scope.createUser = function() {
      Identity.createUser($scope.user);
    };

    $scope.updateUser = function() {
      Identity.updateUser($scope.user);
    };

    $scope.deleteUser = function() {
      Identity.deleteUser();
    };

    $scope.connectUser = function() {
      Communication.connect(Identity.currentUser);
    };

    $scope.startListening = function() {
      Communication.listen();
    };
  });