'use strict';

angular.module('dtmsgApp')
  .controller('ContactCtrl', function ($scope, Identity) {
    $scope.accordion = {
      open: true
    };

    $scope.contacts = Identity.contacts;
  });