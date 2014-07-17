'use strict';

angular.module('dtmsgApp')
  .controller('ChatCtrl', function ($scope, Identity, Communication, Conversation) {
    $scope.user = Identity.currentUser;
    $scope.chats = Conversation.conversations;

    $scope.send = function (contact, message) {
      Communication.sendMessage(Identity.currentUser, contact, message);
    };
  });