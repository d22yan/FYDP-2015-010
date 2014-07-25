'use strict';

angular.module('dtmsgApp')
  .controller('ChatCtrl', function ($scope, $log, Identity, Conversation, Communication) {
    $scope.homeScreen = Conversation.homeScreen;

    $scope.user = Identity.currentUser;
    $scope.contacts = Identity.contacts;

    $scope.send = function (contact) {
      contact.conversation.sendingPromise = Communication.sendMessage(Identity.currentUser, contact);
    };

    $scope.close = function (conversation) {
      if (!conversation.isActive) {
        conversation.isOpen = false;
        return;
      }

      var openChats = Conversation.getOpenConversations();
      var chatToActivate = $scope.homeScreen;

      if (openChats.length > 1) {
        var currentIndex = openChats.indexOf(conversation);

        if (currentIndex === 0) {
          chatToActivate = openChats[currentIndex + 1];
        } else {
          chatToActivate = openChats[currentIndex - 1];
        }
      }

      conversation.isActive = false;
      conversation.isOpen = false;
      chatToActivate.isActive = true;
    };
  });