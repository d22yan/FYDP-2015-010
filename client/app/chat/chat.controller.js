'use strict';

angular.module('dtmsgApp')
  .controller('ChatCtrl', function ($scope, $log, Initialization, Identity, Conversation, Communication) {
    $scope.homeScreen = Conversation.homeScreen;

    $scope.user = Identity.currentUser;
    $scope.contacts = Identity.contacts;

    $scope.loginForm = {
      selectedUser: null,
      userPassword: '',
      authenticationError: false
    };

    $scope.userIndex = Identity.userIndex;

    $scope.authenticationError = false;

    $scope.authenticateUser = function () {

      if (!Identity.authenticateUser($scope.loginForm.selectedUser, $scope.loginForm.userPassword)) {
        $scope.loginForm.authenticationError = true;
        $scope.loginForm.userPassword = '';
        return;
      }

      Initialization.initialize();
    };


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