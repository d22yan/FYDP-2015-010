'use strict';

angular.module('dtmsgApp')
  .controller('ContactCtrl', function ($scope, Identity, Time) {
    $scope.accordion = {
      open: true
    };

    $scope.contacts = Identity.contacts;

    $scope.open = function(conversation) {
      conversation.isOpen = true;
      conversation.isActive = true;
      angular.copy(new Time(), conversation.lastOpened);
    };
  });