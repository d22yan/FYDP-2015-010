'use strict';

angular.module('dtmsgApp')
  .controller('ContactCtrl', function ($scope, Identity, Conversation) {
    $scope.accordion = {
      open: true
    };

    $scope.contacts = Identity.contacts;

    $scope.openChat = function (contact) {
      Conversation.conversations[contact.id].open();
    };
  });