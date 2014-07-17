'use strict';

angular.module('dtmsgApp')
  .controller('ChatCtrl', function ($scope, Identity, Communication, Conversation) {
    $scope.user = Identity.currentUser;
    $scope.chats = Conversation.conversations;

    $scope.send = function (id, message) {
      Communication.sendMessage(Identity.currentUser, id, message);
    };

    $scope.getContactName = function (id) {
      return Identity.contacts[id].name;
    };
  });