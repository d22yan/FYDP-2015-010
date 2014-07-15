'use strict';

angular.module('dtmsgApp')
  .controller('ContactCtrl', function ($scope, Identity) {
    $scope.accordion = {
      open: false
    };

    $scope.contacts = Identity.contacts;
  });