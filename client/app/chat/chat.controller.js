'use strict';

angular.module('dtmsgApp')
  .controller('ChatCtrl', function ($scope, Identity, Communication, Conversation) {
    $scope.user = Identity.currentUser;
    $scope.chats = Conversation.conversations;

    $scope.send = function (id, message) {
      Communication.send(Identity.currentUser, id, message);
    };

    $scope.getChatName = function (id) {
      return Identity.contacts[id].name;
    };
  });