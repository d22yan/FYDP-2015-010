'use strict';

angular.module('dtmsgApp')
  .controller('ContactCtrl', function ($scope, Identity, Conversation) {
    $scope.accordion = {
      open: false
    };

    $scope.contacts = Identity.contacts;

    $scope.openChat = function (id) {
      Conversation.conversations[id].open();
    };
  });